export class SessionManager {
  private static instance: SessionManager;
  private checkInterval: number | null = null;
  private readonly CHECK_INTERVAL = 60000; // 1 minute

  private constructor() {}

  static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  startMonitor(onExpired: () => void): void {
    this.stopMonitor();
    this.checkInterval = window.setInterval(onExpired, this.CHECK_INTERVAL);
  }

  stopMonitor(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }
}