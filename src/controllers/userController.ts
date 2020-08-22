import { NextFunction, Request, Response } from 'express';
import { ResponseSuccess } from '../types/interfaces/apiResponse';
import SuccessMessages from '../constants/success';
import HttpStatuses from '../types/enums/HttpStatuses';
import baseController from './baseController';
import userPreferencesValidator from '../validators/userValidator';
import userPreferencesService from '../services/userService';

class UserController {
  async changeUserPreferences(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      userPreferencesValidator.changeUserPreferences(req.body);
      const userPreferences = req.body;
      const userId = req.user!.user_id;

      await userPreferencesService.changeUserPreferences(userId, userPreferences);

      const responseSuccess: ResponseSuccess<undefined> = {
        statusCode: HttpStatuses.Success,
        message: SuccessMessages.ChangeUserPreferences,
      };
      baseController.handleSuccess(res, responseSuccess);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
