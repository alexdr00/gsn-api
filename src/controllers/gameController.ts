import { NextFunction, Request, Response } from 'express';
import { ResponseSuccess } from '../types/interfaces/apiResponse';
import SuccessMessages from '../constants/success';
import HttpStatuses from '../types/enums/HttpStatuses';
import baseController from './baseController';
import gameValidator from '../validators/gameValidator';
import { GameSearchQueryParams, GameWithPrice, GetFollowedGamesByUserResult } from '../types/interfaces/game';
import gameService from '../services/gameService';
import gameConstants from '../constants/gameConstants';
import { RawgGame } from '../types/interfaces/rawg';
import { FilterParameters } from '../types/interfaces/general';

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

  async follow(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      gameValidator.follow(req.body);
      const rawgGame: RawgGame = req.body;
      const userId = req.user!.user_id;

      await gameService.follow(userId, rawgGame);

      const responseSuccess: ResponseSuccess<undefined> = {
        statusCode: HttpStatuses.Success,
        message: SuccessMessages.FollowGame,
      };
      baseController.handleSuccess(res, responseSuccess);
    } catch (error) {
      next(error);
    }
  }

  async getFollowedGamesByUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const filterParams: FilterParameters = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 20,
        searchQuery: req.query.searchQuery as string,
        sortBy: req.query.sortBy as 'ASC' | 'DESC' || 'ASC',
      };
      gameValidator.getFollowedGamesByUser(filterParams);
      const userId = req.user!.user_id;

      const games: GetFollowedGamesByUserResult[] = await gameService.getFollowedGamesByUser(filterParams, userId);

      const resultTotal = Number(games[0].total);
      const gamesTotalExcluded = games.map((game) => {
        const { total, ...gameWithoutTotalResult } = game;
        return gameWithoutTotalResult;
      });

      const responseSuccess: ResponseSuccess<GameWithPrice[]> = {
        statusCode: HttpStatuses.Success,
        payload: gamesTotalExcluded,
        sorted: filterParams.sortBy,
        page: filterParams.page,
        limit: filterParams.limit,
        total: resultTotal,
      };
      baseController.handleSuccess(res, responseSuccess);
    } catch (error) {
      next(error);
    }
  }
}

export default new GameController();
