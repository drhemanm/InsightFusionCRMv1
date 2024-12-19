import { rateLimiter } from '../utils/security/rateLimiter';
import { sanitizeObject } from '../utils/security/inputSanitizer';
import { sessionManager } from '../utils/security/sessionManager';
import { logger } from '../utils/monitoring/logger';

export const applySecurityMiddleware = (app: any) => {
  // Rate limiting middleware
  app.use((req: any, res: any, next: any) => {
    const key = `${req.ip}_${req.path}`;
    if (rateLimiter.isRateLimited(key)) {
      logger.warn('Rate limit exceeded', { ip: req.ip, path: req.path });
      return res.status(429).json({ error: 'Too many requests' });
    }
    next();
  });

  // Input sanitization middleware
  app.use((req: any, res: any, next: any) => {
    if (req.body) {
      req.body = sanitizeObject(req.body);
    }
    if (req.query) {
      req.query = sanitizeObject(req.query);
    }
    next();
  });

  // Session management
  app.use((req: any, res: any, next: any) => {
    if (req.session) {
      sessionManager.startSession(
        () => {
          req.session.destroy();
          res.redirect('/login');
        },
        () => {
          logger.info('Session expiring soon', { userId: req.session.userId });
        }
      );
    }
    next();
  });
};