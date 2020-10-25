import { NextFunction, Request, Response } from 'express';
import { ResponseSuccess } from '../types/interfaces/apiResponse';
import HttpStatuses from '../types/enums/HttpStatuses';
import baseController from './baseController';
import gameSaleHunterService from '../services/gameSaleHunter';
import GameSaleHunterValidator from '../validators/gameSaleHunterValidator';
import { GetGameSaleQueryParams } from '../types/interfaces/gameSaleHunter';

class GameSaleHunterController {
  async getGameSale(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const getGameSaleQueryParams: GetGameSaleQueryParams = {
        gameId: Number(req.query.gameId),
      };
      GameSaleHunterValidator.getGameSale(getGameSaleQueryParams);

      const userId = req.user!.user_id;
      const { gameId } = getGameSaleQueryParams;

      await gameSaleHunterService.getGameSale(gameId, userId);

      const responseSuccess: ResponseSuccess<undefined> = {
        statusCode: HttpStatuses.Success,
      };
      baseController.handleSuccess(res, responseSuccess);
    } catch (error) {
      next(error);
    }
  }
}

export default new GameSaleHunterController();
