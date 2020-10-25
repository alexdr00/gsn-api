import Joi from '../proxies/joi';
import { GetGameSaleQueryParams } from '../types/interfaces/gameSaleHunter';

const getGameSaleSchema = Joi.object({
  gameId: Joi.number().integer().positive().required(),
});

class GameSaleHunterValidator {
  public getGameSale(getGameSaleQueryParams: GetGameSaleQueryParams) {
    const validation = getGameSaleSchema.validate(getGameSaleQueryParams);

    if (validation.error) {
      throw validation.error;
    }

    return validation.value;
  }
}

export default new GameSaleHunterValidator();
