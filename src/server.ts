import express from 'express';
import { serializeError } from 'serialize-error';
import Logger from './lib/Logger';

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setup();
    this.playground();
  }

  playground() {
    const error = new Error('Aca hubo un error');
    Logger.error(serializeError(error));
    // const err = new Error('sdfs');
    // Logger.info('Okayy');
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
