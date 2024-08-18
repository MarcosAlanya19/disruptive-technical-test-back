import express from 'express';
import authController from './routes/auth.routes';
import cookieParser from 'cookie-parser';

class Application {
  app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(cookieParser())
  }

  private routes() {
    this.app.use('/api', authController);
  }

  start() {
    this.app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  }
}

export const app = new Application();
