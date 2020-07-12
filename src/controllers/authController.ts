import { NextFunction, Request, Response } from 'express';
import authValidator from '../validators/authValidator';
import authService from '../services/authService';
import { ResponseSuccess } from '../types/interfaces/apiResponse';
import SuccessMessages from '../constants/success';
import HttpStatuses from '../types/enums/HttpStatuses';
import baseController from './baseController';


class AuthController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      authValidator.signUp(req.body);
      const signUpBody = req.body;

      await authService.signUp(signUpBody);

      const responseSuccess: ResponseSuccess<undefined> = {
        statusCode: HttpStatuses.Created,
        message: SuccessMessages.SignUp,
      };
      baseController.handleSuccess(res, responseSuccess);
    } catch (error) {
      next(error);
    }
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      authValidator.signIn(req.body);
      const signInBody = req.body;

      const cognitoSession = await authService.signIn(signInBody);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
