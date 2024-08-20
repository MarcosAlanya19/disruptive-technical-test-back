import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import authRoutes from './routes/auth.routes';
import categoryRoutes from './routes/category.routes';
import contentsRoutes from './routes/content.routes';
import themesRoutes from './routes/theme.routes';
import usersRoutes from './routes/user.routes';
import { errorHandler } from './middlewares/errorHandler';

class Application {
  app: express.Application;

  constructor() {
    this.app = express();
    this.routes();
    this.middleware();
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
    this.app.use(errorHandler);
  }

  private routes() {
    this.app.use('/api', authRoutes);
    this.app.use('/api', categoryRoutes);
    this.app.use('/api', themesRoutes);
    this.app.use('/api', contentsRoutes);
    this.app.use('/api', usersRoutes);
  }

  start() {
    this.app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  }
}

export const app = new Application();
