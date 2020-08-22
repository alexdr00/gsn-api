import { Router } from 'express';
import userController from '../controllers/userController';

class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.patch('/change', userController.changeUserPreferences);
  }
}


export default new UserRouter().router;
