import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import authRoutes from './routes/auth.routes';
import categoryRoutes from './routes/category.routes';
import contentsRoutes from './routes/content.routes';
import themesRoutes from './routes/theme.routes';
import usersRoutes from './routes/user.routes';
import { config } from './config';

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
        origin: config.cors.origin,
        credentials: true,
      })
    );
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  private routes() {
    this.app.use('/api', authRoutes);
    this.app.use('/api', categoryRoutes);
    this.app.use('/api', themesRoutes);
    this.app.use('/api', contentsRoutes);
    this.app.use('/api', usersRoutes);
  }

  start() {
    this.app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  }
}

export const app = new Application();
