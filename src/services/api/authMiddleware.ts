import { Request, Response, NextFunction } from 'express';
import { TokenManager } from '../../utils/auth/tokenManager';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!TokenManager.isTokenValid(token)) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const user = TokenManager.parseUser(token);
    if (!user) {
      return res.status(401).json({ error: 'Invalid user token' });
    }

    // Only allow admin users to access backend routes
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};