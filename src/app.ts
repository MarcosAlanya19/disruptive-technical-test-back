import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

import { config } from './config';
import { errorHandler } from './middlewares/errorHandler';
import authRoutes from './routes/auth.routes';
import categoryRoutes from './routes/category.routes';
import contentsRoutes from './routes/content.routes';
import seedRoutes from './routes/seed.routes';
import themesRoutes from './routes/theme.routes';
import usersRoutes from './routes/user.routes';

class Application {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
    this.errorHandling(); // Asegurarse de manejar errores al final
  }

  private middleware(): void {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: config().cors.CORS_ORIGIN,
      })
    );
  }

  private routes(): void {
    this.app.use('/api', seedRoutes);
    this.app.use('/api', authRoutes);
    this.app.use('/api', categoryRoutes);
    this.app.use('/api', themesRoutes);
    this.app.use('/api', contentsRoutes);
    this.app.use('/api', usersRoutes);
  }

  private errorHandling(): void {
    this.app.use(errorHandler); // Manejo de errores debe ser el último middleware
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).json({ message: 'Route not found' });
    });
  }

  public start(): void {
    const port = config().port;
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

export const app = new Application();
