import httpMock from 'node-mocks-http';
import random from 'random';
import { mocked } from 'ts-jest/utils';
import mockSession from '../reusableMocks/mockSession';
import gameController from '../../src/controllers/gameController';
import gameService from '../../src/services/gameService';
import gameConstants from '../../src/constants/gameConstants';
import SuccessMessages from '../../src/constants/success';
import HttpStatuses from '../../src/types/enums/HttpStatuses';

jest.mock('services/gameService');

describe('Game Controller', () => {
  const context: Record<string, any> = {};

  const mockHttp = () => {
    context.req = httpMock.createMocks().req;
    context.res = httpMock.createMocks().res;
    context.next = jest.fn().mockImplementation((err) => { throw err; });
  };

  const setupGlobalContext = () => {
    context.req.user = mockSession;
  };

  beforeEach(() => {
    mockHttp();
    setupGlobalContext();
  });

  describe('Rawg Search', () => {
    beforeEach(() => {
      context.resultsPerPage = random.int(1, 25);
      context.searchQuery = 'test search';
      context.rawgSearchQueryParams = {
        resultsPerPage: context.resultsPerPage,
        searchQuery: context.searchQuery,
      };
    });

    it('Performs a game search with the provided query params', async () => {
      const userId = random.int(1, 10);
      const mockResult = {
        id: random.int(1, 10),
        name: 'test name',
      };
      context.req.user.user_id = userId;
      context.req.query = context.rawgSearchQueryParams;
      // @ts-ignore
      mocked(gameService.rawgSearch).mockResolvedValue(mockResult);
      await gameController.rawgSearch(context.req, context.res, context.next);

      expect(gameService.rawgSearch).toHaveBeenCalledWith(userId, context.rawgSearchQueryParams);
      expect(context.res._getJSONData().payload).toEqual(mockResult);
    });

    it('Defaults max number of results in search if it is not specified in the query params', async () => {
      const userId = random.int(1, 10);
      context.req.user.user_id = userId;
      context.rawgSearchQueryParams.resultsPerPage = undefined;
      context.req.query = context.rawgSearchQueryParams;
      await gameController.rawgSearch(context.req, context.res, context.next);

      const expectedCallParams = {
        resultsPerPage: gameConstants.DEFAULT_NUMBER_OF_RESULTS_IN_SEARCH,
        searchQuery: context.searchQuery,
      };
      expect(gameService.rawgSearch).toHaveBeenCalledWith(userId, expectedCallParams);
    });

    it('Returns validation messages the query params specified are incorrect', async () => {
      const userId = random.int(1, 10);
      context.req.user.user_id = userId;
      context.rawgSearchQueryParams.resultsPerPage = 50;
      context.req.query = context.rawgSearchQueryParams;

      try {
        await gameController.rawgSearch(context.req, context.res, context.next);
      } catch (error) {
        expect(error.name).toBe('ValidationError');
      }

      expect.hasAssertions();
    });
  });

  describe('Follow Game', () => {
    beforeEach(() => {
      context.followGameBody = {
        id: random.int(1, 10),
        name: 'Test game name',
        slug: 'test-game-name',
      };
      context.userId = random.int(1, 10);
      context.req.user.user_id = context.userId;
    });

    it('Calls the service to follow a game and returns a sucessful response', async () => {
      context.req.body = context.followGameBody;
      await gameController.follow(context.req, context.res, context.next);

      expect(gameService.follow).toHaveBeenCalledWith(context.userId, context.followGameBody);
      expect(context.res._getJSONData().message).toStrictEqual(SuccessMessages.FollowGame);
      expect(context.res.statusCode).toStrictEqual(HttpStatuses.Success);
    });

    it('Returns validation errors when the body in incomplete', async () => {
      context.followGameBody.name = undefined;
      context.req.body = context.followGameBody;

      try {
        await gameController.follow(context.req, context.res, context.next);
      } catch (error) {
        expect(error.name).toBe('ValidationError');
      }

      expect.hasAssertions();
    });
  });

  describe('Get Followed Games By User', () => {
    beforeEach(() => {
      context.page = 1;
      context.limit = 10;
      context.searchQuery = 'The';
      context.sortBy = 'DESC';
      context.userId = random.int(1, 10);
      context.followedGames = [
        {
          id: random.int(),
        },
        {
          id: random.int(),
        },
      ];
      mocked(gameService.getFollowedGamesByUser).mockResolvedValue(context.followedGames);
    });

    it('Calls the game service to get all games followed by the user with proper default values', async () => {
      const { userId } = context;
      context.req.user.user_id = userId;
      context.req.query = {};
      const defaultFilterParams = {
        page: 1,
        limit: 20,
        searchQuery: undefined,
        sortBy: 'ASC',
      };

      await gameController.getFollowedGamesByUser(context.req, context.res, context.next);
      expect(gameService.getFollowedGamesByUser).toHaveBeenCalledWith(defaultFilterParams, userId);
    });

    it('Calls the game service to get all games followed by the user with passed values', async () => {
      const { userId } = context;
      context.req.user.user_id = userId;
      const filterParams = {
        page: random.int(1, 10),
        limit: random.int(1, 10),
        searchQuery: 'The',
        sortBy: 'DESC',
      };
      context.req.query = { ...filterParams };

      await gameController.getFollowedGamesByUser(context.req, context.res, context.next);
      expect(gameService.getFollowedGamesByUser).toHaveBeenCalledWith(filterParams, userId);
    });

    it('Returns payload as empty array if no followed games were returned', async () => {
      mocked(gameService.getFollowedGamesByUser).mockResolvedValue([]);

      await gameController.getFollowedGamesByUser(context.req, context.res, context.next);
      const { payload } = context.res._getJSONData();
      expect(payload).toStrictEqual([]);
    });

    it('Includes some of the filter params inside the reseponse itself', async () => {
      const { userId } = context;
      context.req.user.user_id = userId;
      const filterParams = {
        page: random.int(1, 10),
        limit: random.int(1, 10),
        searchQuery: 'The',
        sortBy: 'DESC',
      };
      context.req.query = { ...filterParams };

      await gameController.getFollowedGamesByUser(context.req, context.res, context.next);
      const { page, limit, sorted } = context.res._getJSONData();
      expect(page).toBe(filterParams.page);
      expect(limit).toBe(filterParams.limit);
      expect(sorted).toBe(filterParams.sortBy);
    });

    it('Grabs the first result\'s total, appends it to the response and delete it from the payload items', async () => {
      const { userId } = context;
      const mockTotal = random.int(1, 10);
      context.followedGames[0].total = mockTotal;
      context.req.user.user_id = userId;
      mocked(gameService.getFollowedGamesByUser).mockResolvedValue(context.followedGames);

      await gameController.getFollowedGamesByUser(context.req, context.res, context.next);

      const { total, payload } = context.res._getJSONData();
      const { total: resultTotal, ...resultWithoutTotal } = context.followedGames[0];
      context.followedGames[0] = resultWithoutTotal;

      expect(total).toBe(mockTotal);
      expect(payload).toStrictEqual(context.followedGames);
    });
  });
});
