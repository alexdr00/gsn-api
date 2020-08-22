import { Router } from 'express';
import userPreferences from '../controllers/userPreferences';

class UserPreferencesRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.patch('/change', userPreferences.changeUserPreferences);
  }
}


export default new UserPreferencesRouter().router;
