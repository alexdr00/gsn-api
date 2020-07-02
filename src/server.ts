import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import authRouter from './routers/authRouter';

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setup();
  }

  private setup() {
    this.useMiddleware();
    this.mountRoutes();
  }

  private useMiddleware() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(morgan('dev'));
  }

  private mountRoutes() {
    const router = express.Router();
    router.use('/health', (req, res) => res.send({ message: 'ok' }));
    router.use('/auth', authRouter);

    this.app.use('/v1', router);
  }
}

export default new Server();
