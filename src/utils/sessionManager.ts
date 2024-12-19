import { getStoredToken, isTokenValid, removeStoredToken } from './auth';

export class SessionManager {
  private static instance: SessionManager;
  private checkInterval: number | null = null;

  private constructor() {
    // Private constructor for singleton
  }

  static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  startSessionMonitor(onSessionExpired: () => void): void {
    this.stopSessionMonitor();
    
    this.checkInterval = window.setInterval(() => {
      const token = getStoredToken();
      if (!token || !isTokenValid(token)) {
        this.handleSessionExpired(onSessionExpired);
      }
    }, 60000); // Check every minute
  }

  stopSessionMonitor(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  private handleSessionExpired(callback: () => void): void {
    this.stopSessionMonitor();
    removeStoredToken();
    callback();
  }
}