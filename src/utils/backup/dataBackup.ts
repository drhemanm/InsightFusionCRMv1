```typescript
import { logger } from '../monitoring/logger';

interface BackupConfig {
  frequency: 'hourly' | 'daily' | 'weekly';
  retention: number;
  compress: boolean;
}

class DataBackupService {
  private static instance: DataBackupService;
  private backupInProgress = false;
  private lastBackup: Date | null = null;

  private constructor() {
    this.initializeBackups();
  }

  static getInstance(): DataBackupService {
    if (!DataBackupService.instance) {
      DataBackupService.instance = new DataBackupService();
    }
    return DataBackupService.instance;
  }

  private initializeBackups() {
    // Schedule regular backups
    setInterval(() => {
      this.performIncrementalBackup();
    }, 3600000); // Every hour

    // Schedule full backups
    setInterval(() => {
      this.performFullBackup();
    }, 86400000); // Every day
  }

  private async performIncrementalBackup() {
    if (this.backupInProgress) return;

    try {
      this.backupInProgress = true;
      logger.info('Starting incremental backup');

      // Get modified data since last backup
      const modifiedData = await this.getModifiedData();

      // Backup to storage
      await this.backupData(modifiedData, 'incremental');

      this.lastBackup = new Date();
      logger.info('Incremental backup completed');
    } catch (error) {
      logger.error('Incremental backup failed', { error });
    } finally {
      this.backupInProgress = false;
    }
  }

  private async performFullBackup() {
    if (this.backupInProgress) return;

    try {
      this.backupInProgress = true;
      logger.info('Starting full backup');

      // Get all data
      const allData = await this.getAllData();

      // Backup to storage
      await this.backupData(allData, 'full');

      this.lastBackup = new Date();
      logger.info('Full backup completed');
    } catch (error) {
      logger.error('Full backup failed', { error });
    } finally {
      this.backupInProgress = false;
    }
  }

  private async getModifiedData(): Promise<any> {
    // Implementation would depend on data store
    return {};
  }

  private async getAllData(): Promise<any> {
    // Implementation would depend on data store
    return {};
  }

  private async backupData(data: any, type: 'full' | 'incremental'): Promise<void> {
    // Implementation would depend on storage solution
  }

  async restoreFromBackup(backupId: string): Promise<boolean> {
    try {
      logger.info('Starting backup restoration', { backupId });
      // Implementation would depend on storage solution
      return true;
    } catch (error) {
      logger.error('Backup restoration failed', { error, backupId });
      return false;
    }
  }
}

export const dataBackupService = DataBackupService.getInstance();
```