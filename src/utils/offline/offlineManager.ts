import { logger } from '../monitoring/logger';

interface QueuedAction {
  id: string;
  type: string;
  data: any;
  timestamp: number;
}

class OfflineManager {
  private static instance: OfflineManager;
  private actionQueue: QueuedAction[] = [];
  private isOnline: boolean = navigator.onLine;

  private constructor() {
    this.setupListeners();
    this.loadQueue();
  }

  static getInstance(): OfflineManager {
    if (!OfflineManager.instance) {
      OfflineManager.instance = new OfflineManager();
    }
    return OfflineManager.instance;
  }

  private setupListeners(): void {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.processQueue();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      logger.warn('Application is offline');
    });
  }

  private loadQueue(): void {
    const saved = localStorage.getItem('offlineQueue');
    if (saved) {
      this.actionQueue = JSON.parse(saved);
    }
  }

  private saveQueue(): void {
    localStorage.setItem('offlineQueue', JSON.stringify(this.actionQueue));
  }

  queueAction(type: string, data: any): string {
    const action: QueuedAction = {
      id: crypto.randomUUID(),
      type,
      data,
      timestamp: Date.now()
    };

    this.actionQueue.push(action);
    this.saveQueue();
    logger.info('Action queued for offline processing', { type });

    return action.id;
  }

  async processQueue(): Promise<void> {
    if (!this.isOnline || this.actionQueue.length === 0) return;

    logger.info('Processing offline queue', { 
      queueLength: this.actionQueue.length 
    });

    const processedIds: string[] = [];

    for (const action of this.actionQueue) {
      try {
        await this.processAction(action);
        processedIds.push(action.id);
      } catch (error) {
        logger.error('Failed to process queued action', { 
          actionId: action.id, 
          error 
        });
        break;
      }
    }

    // Remove processed actions
    this.actionQueue = this.actionQueue.filter(
      action => !processedIds.includes(action.id)
    );
    this.saveQueue();
  }

  private async processAction(action: QueuedAction): Promise<void> {
    // Implement action processing based on type
    switch (action.type) {
      case 'create_contact':
        // await contactService.create(action.data);
        break;
      case 'update_deal':
        // await dealService.update(action.data.id, action.data);
        break;
      // Add more action types as needed
    }
  }

  getQueueLength(): number {
    return this.actionQueue.length;
  }

  isNetworkAvailable(): boolean {
    return this.isOnline;
  }
}

export const offlineManager = OfflineManager.getInstance();