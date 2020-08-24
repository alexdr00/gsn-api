import gameService from 'services/gameService';
import userRepo from 'repositories/userRepo';
import rawg from 'proxies/rawg';
import { mocked } from 'ts-jest/utils';
import ServiceErrors from 'constants/errors/services';
import random from 'random';

jest.mock('repositories/userRepo');
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
});
