import { NextFunction, Request, Response } from 'express';
import { ResponseSuccess } from '../types/interfaces/apiResponse';
import SuccessMessages from '../constants/success';
import HttpStatuses from '../types/enums/HttpStatuses';
import baseController from './baseController';
import userPreferencesValidator from '../validators/userPreferencesValidator';
import userPreferencesService from '../services/userPreferencesService';

class UserPreferencesController {
  async changeUserPreferences(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      userPreferencesValidator.changeUserPreferences(req.body);
      const userPreferencesBody = req.body;

      await userPreferencesService.changeUserPreferences(userPreferencesBody);

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

export default new UserPreferencesController();
