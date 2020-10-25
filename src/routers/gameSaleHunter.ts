import { Router } from 'express';
import gameSaleHunterController from '../controllers/gameSaleHunterController';

class GameSaleHunterRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.get('/get-game-sale', gameSaleHunterController.getGameSale);
    // this.router.get('/get-sales-of-followed-games', gameSaleHunterController.getSalesOfFollowedGames);
  }
}


export default new GameSaleHunterRouter().router;
