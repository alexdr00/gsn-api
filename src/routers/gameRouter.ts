import { Router } from 'express';
import gameController from '../controllers/gameController';

class GameRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.get('/rawg-search', gameController.rawgSearch);
    this.router.post('/follow', gameController.follow);
  }
}


export default new GameRouter().router;
