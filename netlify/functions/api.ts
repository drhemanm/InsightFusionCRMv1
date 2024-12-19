import express, { Router } from 'express';
import serverless from 'serverless-http';
import { connectDatabase } from '../../server/config/database';
import { requireAuth } from '../../src/services/api/authMiddleware';
import { contactRoutes } from '../../server/routes/contacts';
import { dealRoutes } from '../../server/routes/deals';
import { taskRoutes } from '../../server/routes/tasks';
import { organizationRoutes } from '../../server/routes/organizations';

const api = express();
const router = Router();

// Connect to database
connectDatabase();

// Apply auth middleware to all routes
router.use(requireAuth);

// Routes
router.use('/contacts', contactRoutes);
router.use('/deals', dealRoutes);
router.use('/tasks', taskRoutes);
router.use('/organizations', organizationRoutes);

// Health check (no auth required)
router.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

api.use('/api', router);

// Error handling
api.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export const handler = serverless(api);