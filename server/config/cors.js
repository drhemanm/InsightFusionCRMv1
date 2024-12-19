import cors from 'cors';

const corsOptions = {
  origin: [
    'https://glittering-moxie-90edde.netlify.app',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

export const configureCors = (app) => {
  app.use(cors(corsOptions));
};