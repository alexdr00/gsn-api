import { NextFunction, Request, Response } from 'express';
import authValidator from '../validators/authValidator';
import authService from '../services/authService';

class AuthController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      authValidator.signUp(req.body);
      const signUpBody = req.body;

      await authService.signUp(signUpBody);

      res.json({ allgood: 'allgodd' });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
