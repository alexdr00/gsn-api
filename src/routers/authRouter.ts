import { Router } from 'express';
import authController from '../controllers/authController';

class AuthRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.post('/sign-up', authController.signUp);
  }
}


export default new AuthRouter().router;
