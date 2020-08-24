import { NextFunction, Request, Response } from 'express';
import { ResponseSuccess } from '../types/interfaces/apiResponse';
import SuccessMessages from '../constants/success';
import HttpStatuses from '../types/enums/HttpStatuses';
import baseController from './baseController';
import gameValidator from '../validators/gameValidator';
import { GameSearchQueryParams } from '../types/interfaces/game';
import gameService from '../services/gameService';
import gameConstants from '../constants/gameConstants';

class GameController {
  async rawgSearch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.user_id;
      const gameSearchQueryParams: GameSearchQueryParams = {
        resultsPerPage: Number(req.query.resultsPerPage || gameConstants.DEFAULT_NUMBER_OF_RESULTS_IN_SEARCH),
        searchQuery: req.query.searchQuery as string,
      };
      gameValidator.rawgSearch(gameSearchQueryParams);

      const searchResults = await gameService.rawgSearch(userId, gameSearchQueryParams);
      const responseSuccess: ResponseSuccess<any> = {
        statusCode: HttpStatuses.Success,
        message: SuccessMessages.RawgSearch,
        payload: searchResults,
      };
      baseController.handleSuccess(res, responseSuccess);
    } catch (error) {
      next(error);
    }
  }
}

export default new GameController();
