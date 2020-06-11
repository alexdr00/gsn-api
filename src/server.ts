import express from 'express';

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setup();
  }

  setup() {
    this.mountRoutes();
  }

  mountRoutes() {
    const router = express.Router();
    router.use('/health', (req, res) => res.send({ message: 'ok' }));

    this.app.use('/v1', router);
  }
}

export default new Server();
