import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';

import authController from './routes/auth.routes';
import tasksController from './routes/tasks.routes';

class Application {
  app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(
      cors({
        origin: 'http://localhost:5173',
        credentials: true,
      })
    );
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  private routes() {
    this.app.use('/api', authController);
    this.app.use('/api', tasksController);
  }

  start() {
    this.app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  }
}

export const app = new Application();
