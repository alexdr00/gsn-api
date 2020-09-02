import verror from '../proxies/verror';
import ServiceErrors from '../constants/errors/services';
import userRepo from '../repositories/userRepo';
import {
  GameSearchQueryParams, GameSearchParams, GetFollowedGamesByUserResult,
} from '../types/interfaces/game';
import rawg from '../proxies/rawg';
import { Platform } from '../types/interfaces/platform';
import { RawgGame } from '../types/interfaces/rawg';
import gameRepo from '../repositories/gameRepo';
import insertPlatformsByGame from '../steps/insertPlatformByGame';
import ResponseErrors from '../constants/errors/responses';
import { FilterParameters } from '../types/interfaces/general';

class GameService {
  public async rawgSearch(userId: number, gameSearchQueryParams: GameSearchQueryParams): Promise<RawgGame[]> {
    try {
      const preferredPlatform: Platform = await userRepo.getUserPreferredPlatform(userId);
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

  public async follow(userId: number, rawgGame: RawgGame): Promise<void> {
    try {
      const game = await gameRepo.getGameByRawgId(rawgGame.id);
      let insertedGameId;

      if (game === undefined) {
        insertedGameId = await gameRepo.insertGame(rawgGame);
        await insertPlatformsByGame(insertedGameId, rawgGame.platforms);
      }

      const gameId = insertedGameId || game!.id;

      const followedGame = await gameRepo.getFollowedGameByUser(gameId, userId);
      if (followedGame !== undefined) {
        throw verror.createError({
          name: ResponseErrors.GameAlreadyBeingFollowed.name,
          message: ResponseErrors.GameAlreadyBeingFollowed.message,
        });
      }

      await gameRepo.followGame(userId, gameId);
    } catch (error) {
      throw verror.createError({
        name: ServiceErrors.GameFollow.name,
        message: ServiceErrors.GameFollow.message,
        cause: error,
        debugParams: {
          name: rawgGame.name,
          rawgId: rawgGame.id,
          userId,
        },
      });
    }
  }

  public async getFollowedGamesByUser(filterParameters: FilterParameters, userId: number)
    : Promise<GetFollowedGamesByUserResult[]> {
    try {
      const userPreferredPlatform: Platform = await userRepo.getUserPreferredPlatform(userId);
      const userData = { preferredPlatformId: userPreferredPlatform.id, userId };
      const games = await gameRepo.getFollowedGamesByUser(filterParameters, userData);

      return games;
    } catch (error) {
      throw verror.createError({
        name: ServiceErrors.GetFollowedGamesByUser.name,
        message: ServiceErrors.GetFollowedGamesByUser.message,
        cause: error,
        debugParams: { filterParameters, userId },
      });
    }
  }
}

export default new GameService();
