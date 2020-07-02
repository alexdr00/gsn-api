import { Request, Response } from 'express';
import authValidator from '../validators/authValidator';
import authService from '../services/authService';
import userRepo from '../repositories/userRepo';

class AuthController {
  async signUp(req: Request, res: Response) {
    try {
      authValidator.signUp(req.body);
      const { email, name } = req.body;
      const signUpBody = req.body;
      const newUserData = { email, name };

      // await authService.signUp(signUpBody);
      await userRepo.createUser(newUserData);

      res.json({ allgood: 'allgodd' });
    } catch (error) {
      res.json({ allbad: 'allbad' });

      console.log(error);
    }
  }
}

export default new AuthController();
