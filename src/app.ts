import express from 'express';

class Application {
  app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.json());
  }

  private routes() {
    this.app.get('/', (req, res) => {
      res.send('Hello, World!');
    });
  }

  start() {
    this.app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  }
}

export const app = new Application();
