import { NextFunction, Request, Response } from 'express';
import authValidator from '../validators/authValidator';
import authService from '../services/authService';
import { ResponseSuccess } from '../types/interfaces/apiResponse';
import SuccessMessages from '../constants/success';
import HttpStatuses from '../types/enums/HttpStatuses';
import baseController from './baseController';
import { Tokens } from '../types/interfaces/session';

class AuthController {
  async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
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

  async signIn(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      authValidator.signIn(req.body);
      const signInBody = req.body;

      const cognitoSession = await authService.signIn(signInBody);
      const responseSuccess: ResponseSuccess<Tokens> = {
        message: SuccessMessages.SignIn,
        payload: cognitoSession,
      };
      baseController.handleSuccess(res, responseSuccess);
    } catch (error) {
      next(error);
    }
  }

  async checkIsAuthenticated(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { authorization: bearerToken } = req.headers;
      await authService.getUserSessionFromBearerToken(bearerToken);

      const responseSuccess: ResponseSuccess<boolean> = {
        message: SuccessMessages.CheckIsAuthenticated,
        payload: true,
      };
      baseController.handleSuccess(res, responseSuccess);
    } catch (error) {
      next(error);
    }
  }

  async refreshIdToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      authValidator.refreshIdToken(req.body);
      const { email } = req.user!;
      const { refreshToken } = req.body;

      const tokens = await authService.refreshIdToken(refreshToken, email);

      const responseSuccess: ResponseSuccess<Tokens> = {
        message: SuccessMessages.RefreshIdToken,
        payload: tokens,
      };
      baseController.handleSuccess(res, responseSuccess);
    } catch (error) {
      next(error);
    }
  }

  async signOut(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.user!;
      await authService.signOut(email);

      const responseSuccess: ResponseSuccess<undefined> = {
        message: SuccessMessages.SignOut,
      };
      baseController.handleSuccess(res, responseSuccess);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
