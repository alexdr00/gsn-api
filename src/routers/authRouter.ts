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
    this.router.post('/sign-in', authController.signIn);
    this.router.get('/check-is-authenticated', authController.checkIsAuthenticated);
    this.router.post('/refresh-token', authController.refreshIdToken);
    this.router.delete('/sign-out', authController.signOut);
  }
}


export default new AuthRouter().router;
