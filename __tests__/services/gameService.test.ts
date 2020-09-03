import gameService from 'services/gameService';
import userRepo from 'repositories/userRepo';
import gameRepo from 'repositories/gameRepo';
import rawg from 'proxies/rawg';
import { mocked } from 'ts-jest/utils';
import ServiceErrors from 'constants/errors/services';
import random from 'random';
import insertPlatformsByGame from 'steps/insertPlatformByGame';
import ResponseErrors from '../../src/constants/errors/responses';

jest.mock('repositories/userRepo');
jest.mock('repositories/gameRepo');
jest.mock('steps/insertPlatformByGame');
jest.mock('proxies/rawg');

describe('Game Service', () => {
  const context: Record<string, any> = {};

  describe('Rawg Search', () => {
    beforeEach(() => {
      context.resultsPerPage = random.int(1, 25);
      context.searchQuery = 'test search';
      context.rawgSearchQueryParams = {
        resultsPerPage: context.resultsPerPage,
        searchQuery: context.searchQuery,
      };
      context.platform = {
        platformRawgId: random.int(1, 10),
        name: 'test platform',
        slug: 'test-platform',
      };

      mocked(userRepo.getUserPreferredPlatform).mockResolvedValue(context.platform);
    });

    it('Calls the repo and gets the user preferred platform', async () => {
      const userId = random.int(1, 10);

      await gameService.rawgSearch(userId, context.rawgSearchQueryParams);
      expect(userRepo.getUserPreferredPlatform).toHaveBeenCalledWith(userId);
    });

    it('Calls the rawg service with the specified params', async () => {
      const userId = random.int(1, 10);
      const expectedParams = {
        ...context.rawgSearchQueryParams,
        platformRawgId: context.platform.platformRawgId,
      };

      await gameService.rawgSearch(userId, context.rawgSearchQueryParams);
      expect(rawg.searchGame).toHaveBeenCalledWith(expectedParams);
    });

    it('Throws a descriptive error when it fails', async () => {
      const testError = new Error('Test error here!');
      mocked(userRepo.getUserPreferredPlatform).mockImplementation(() => { throw testError; });

      try {
        await gameService.rawgSearch(context.userId, context.rawgSearchQueryParams);
      } catch (error) {
        expect(error.name).toBe(ServiceErrors.RawgGameSearch.name);
        expect(error.message).toBe(ServiceErrors.RawgGameSearch.message);
      }

      expect.hasAssertions();
    });
  });

  describe('Follow Game Service', () => {
    beforeEach(() => {
      context.rawgGame = {
        id: random.int(1, 10),
        name: 'Test game name',
        slug: 'test-game-name',
        platforms: [
          {
            platform: { id: random.int(1, 10) },
          },
        ],
      };
      context.game = {
        id: random.int(1, 10),
        name: 'Test game name',
      };
      context.userId = random.int(1, 10);
    });

    it('Calls the repo correctly to get a game by rawg game id', async () => {
      mocked(gameRepo.getGameByRawgId).mockResolvedValue(context.game);
      await gameService.follow(context.userId, context.rawgGame);
      expect(gameRepo.getGameByRawgId).toHaveBeenCalledWith(context.rawgGame.id);
    });

    it('Inserts the provided game and its respective platforms if the game does not exist in the db then ', async () => {
      const insertedGameIdMock = random.int(1, 10);
      mocked(gameRepo.getGameByRawgId).mockResolvedValue(undefined);
      mocked(gameRepo.insertGame).mockResolvedValue(insertedGameIdMock);

      await gameService.follow(context.userId, context.rawgGame);
      expect(gameRepo.insertGame).toHaveBeenCalledWith(context.rawgGame);
      expect(insertPlatformsByGame).toHaveBeenCalledWith(insertedGameIdMock, context.rawgGame.platforms);
    });

    it('Creates a followed game-user relationship using the game id that was in the db', async () => {
      mocked(gameRepo.getGameByRawgId).mockResolvedValue(context.game);

      await gameService.follow(context.userId, context.rawgGame);
      expect(gameRepo.getFollowedGameByUser).toHaveBeenCalledWith(context.game.id, context.userId);
      expect(gameRepo.followGame).toHaveBeenCalledWith(context.userId, context.game.id);
    });

    it('Creates a followed game-user relationship using the recently created game id, if id did not exist in the db before', async () => {
      const insertedGameIdMock = random.int(1, 10);
      mocked(gameRepo.getGameByRawgId).mockResolvedValue(undefined);
      mocked(gameRepo.insertGame).mockResolvedValue(insertedGameIdMock);

      await gameService.follow(context.userId, context.rawgGame);
      expect(gameRepo.getFollowedGameByUser).toHaveBeenCalledWith(insertedGameIdMock, context.userId);
      expect(gameRepo.followGame).toHaveBeenCalledWith(context.userId, insertedGameIdMock);
    });

    it('Returns an error if the user tries to follow a game that it is already following', async () => {
      mocked(gameRepo.getGameByRawgId).mockResolvedValue(context.game);
      mocked(gameRepo.getFollowedGameByUser).mockResolvedValue({ id: random.int(1, 10) });

      try {
        await gameService.follow(context.userId, context.rawgGame);
      } catch (err) {
        expect(err.jse_cause.message).toBe(ResponseErrors.GameAlreadyBeingFollowed.message);
      }

      expect.hasAssertions();
    });

    it('Returns a detailed error when the service fails', async () => {
      const testError = new Error('Test error here!');
      mocked(gameRepo.getGameByRawgId).mockImplementation(() => { throw testError; });

      try {
        await gameService.follow(context.userId, context.rawgGame);
      } catch (err) {
        expect(err.name).toBe(ServiceErrors.GameFollow.name);
        expect(err.message).toBe(ServiceErrors.GameFollow.message);
      }

      expect.hasAssertions();
    });
  });

  describe('Get Followed Games By User', () => {
    beforeEach(() => {
      context.filterParams = {
        page: 1,
        limit: 10,
        searchQuery: 'The',
        sortBy: 'DESC',
      };
      context.userId = random.int(1, 10);
    });

    it('Gets the user preferred platform so we can filter it while fetching the followed games by the user', async () => {
      const mockPlatform = { id: random.int(1, 10) };
      // @ts-ignore
      mocked(userRepo.getUserPreferredPlatform).mockResolvedValue(mockPlatform);

      const userData = { userId: context.userId, preferredPlatformId: mockPlatform.id };
      await gameService.getFollowedGamesByUser(context.filterParams, context.userId);
      expect(userRepo.getUserPreferredPlatform).toHaveBeenCalledWith(context.userId);
      expect(gameRepo.getFollowedGamesByUser).toHaveBeenCalledWith(context.filterParams, userData);
    });

    it('Returns as response to what the gameRepo "getFollowedGamesByUser" returns', async () => {
      const mockFollowedGames = [{ id: random.int(1, 10) }, { id: random.int(1, 10) }];
      // @ts-ignore
      mocked(gameRepo.getFollowedGamesByUser).mockResolvedValue(mockFollowedGames);

      const result = await gameService.getFollowedGamesByUser(context.filterParams, context.userId);
      expect(result).toStrictEqual(mockFollowedGames);
    });

    it('Returns a detailed error when the service fails', async () => {
      const testError = new Error('Test error here!');
      mocked(gameRepo.getFollowedGamesByUser).mockImplementation(() => { throw testError; });

      try {
        await gameService.getFollowedGamesByUser(context.filterParams, context.userId);
      } catch (err) {
        expect(err.name).toBe(ServiceErrors.GetFollowedGamesByUser.name);
        expect(err.message).toBe(ServiceErrors.GetFollowedGamesByUser.message);
      }

      expect.hasAssertions();
    });
  });
});
