import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import authRouter from './routers/authRouter';
import errorHander from './middleware/errorHander';
import requireAuth from './middleware/requireAuth';
import userPreferencesRouter from './routers/userRouter';
import gameRouter from './routers/gameRouter';
import gameSaleHunterRouter from './routers/gameSaleHunter';

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setup();
  }

  private setup() {
    this.useMiddleware();
    this.mountRoutes();
    this.useErrorHandlingMiddleware();
  }

  private useMiddleware() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(morgan('dev'));
    this.app.use(requireAuth);
  }

  private useErrorHandlingMiddleware() {
    this.app.use(errorHander);
  }

  private mountRoutes() {
    const router = express.Router();
    router.use('/health', (req, res) => res.send({ message: 'ok' }));
    router.use('/auth', authRouter);
    router.use('/user-preferences', userPreferencesRouter);
    router.use('/game', gameRouter);
    router.use('/game-sale-hunter', gameSaleHunterRouter);

    this.app.use('/v1', router);
  }
}

export default new Server();
