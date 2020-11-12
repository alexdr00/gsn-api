import verror from '../proxies/verror';
import ServiceErrors from '../constants/errors/services';
import userRepo from '../repositories/userRepo';
import GameSaleHunterScrapper from '../strategies/game-sale-hunter';
import { ScrapperParams } from '../types/interfaces/gameSaleHunter';
import gameRepo from '../repositories/gameRepo';
import shouldExistPrecondition from '../preconditions/shouldExistPrecondition';
import { Game } from '../types/interfaces/game';

class GameService {
  public async getGameSale(gameId: number, userId: number): Promise<void> {
    try {
      const country = await userRepo.getUserCountryData(userId);
      const userPreferredPlatform = await userRepo.getUserPreferredPlatform(userId);
      const game = await gameRepo.getGameById(gameId);

      shouldExistPrecondition<Game | undefined>(game, 'Game');

      const scrapperParams: ScrapperParams = { country, game: game! };

      const SaleHunterScrapper = GameSaleHunterScrapper.getScrapperMethodBasedOnPlatform(userPreferredPlatform);
      const gamePrice = await SaleHunterScrapper.run(scrapperParams);
    } catch (error) {
      throw verror.createError({
        name: ServiceErrors.GetGameSale.name,
        message: ServiceErrors.GetGameSale.message,
        cause: error,
        debugParams: { userId, gameId },
      });
    }
  }
}

export default new GameService();
