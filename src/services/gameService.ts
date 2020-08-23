import verror from '../proxies/verror';
import ServiceErrors from '../constants/errors/services';
import userRepo from '../repositories/userRepo';
import { GameSearchQueryParams, GameSearchParams } from '../types/interfaces/game';
import rawg from '../proxies/rawg';

class GameService {
  public async rawgSearch(userId: number, gameSearchQueryParams: GameSearchQueryParams) {
    try {
      const preferredPlatform = await userRepo.getUserPreferredPlatform(userId);

      const { platformRawgId } = preferredPlatform;
      const gameSearchParams: GameSearchParams = {
        ...gameSearchQueryParams,
        platformRawgId,
      };

      return rawg.searchGame(gameSearchParams);
    } catch (error) {
      throw verror.createError({
        name: ServiceErrors.RawgGameSearch.name,
        message: ServiceErrors.RawgGameSearch.message,
        cause: error,
        debugParams: { userId, gameSearchQueryParams },
      });
    }
  }
}

export default new GameService();
