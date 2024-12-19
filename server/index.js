import express from 'express';
import dotenv from 'dotenv';
import { configureCors } from './config/cors.js';
import { connectDatabase } from './config/database.js';
import { contactRoutes } from './routes/contacts.js';
import { dealRoutes } from './routes/deals.js';
import { taskRoutes } from './routes/tasks.js';
import { organizationRoutes } from './routes/organizations.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS
configureCors(app);

// Middleware
app.use(express.json());

// Connect to database
connectDatabase();

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Routes
app.use('/api/contacts', contactRoutes);
app.use('/api/deals', dealRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/organizations', organizationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});