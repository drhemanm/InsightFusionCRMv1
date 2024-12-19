import { TokenManager } from './tokenManager';

export class SessionManager {
  private static instance: SessionManager;
  private checkInterval: number | null = null;

  private constructor() {}

  static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  startMonitor(onExpired: () => void): void {
    this.stopMonitor();
    
    this.checkInterval = window.setInterval(() => {
      const token = TokenManager.getToken();
      if (!token || !TokenManager.isTokenValid(token)) {
        this.handleExpired(onExpired);
      }
    }, 60000);
  }

  stopMonitor(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  private handleExpired(callback: () => void): void {
    this.stopMonitor();
    TokenManager.removeTokens();
    callback();
  }
}