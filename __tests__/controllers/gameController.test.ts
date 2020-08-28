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
});
