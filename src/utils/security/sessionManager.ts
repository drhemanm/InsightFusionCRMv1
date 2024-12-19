import { logger } from '../monitoring/logger';

interface SessionConfig {
  timeoutMinutes: number;
  warningMinutes: number;
}

class SessionManager {
  private static instance: SessionManager;
  private timeoutId?: number;
  private warningId?: number;
  private readonly defaultConfig: SessionConfig = {
    timeoutMinutes: 30,
    warningMinutes: 5
  };

  private constructor() {}

  static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  startSession(onTimeout: () => void, onWarning: () => void, config?: Partial<SessionConfig>): void {
    this.stopSession();

    const { timeoutMinutes, warningMinutes } = { ...this.defaultConfig, ...config };
    const timeoutMs = timeoutMinutes * 60 * 1000;
    const warningMs = (timeoutMinutes - warningMinutes) * 60 * 1000;

    // Set warning timer
    this.warningId = window.setTimeout(() => {
      onWarning();
      logger.info('Session warning triggered');
    }, warningMs);

    // Set timeout timer
    this.timeoutId = window.setTimeout(() => {
      onTimeout();
      logger.info('Session timeout triggered');
    }, timeoutMs);

    // Reset timers on user activity
    const resetTimers = () => {
      this.stopSession();
      this.startSession(onTimeout, onWarning, config);
    };

    window.addEventListener('mousemove', resetTimers);
    window.addEventListener('keypress', resetTimers);
    window.addEventListener('click', resetTimers);
    window.addEventListener('scroll', resetTimers);
  }

  stopSession(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    if (this.warningId) {
      clearTimeout(this.warningId);
    }
  }
}

export const sessionManager = SessionManager.getInstance();