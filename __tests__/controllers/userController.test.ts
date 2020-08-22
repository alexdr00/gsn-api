import httpMock from 'node-mocks-http';
import HttpStatuses from 'types/enums/HttpStatuses';
import SuccessMessages from 'constants/success';
import random from 'random';
import mockSession from '../reusableMocks/mockSession';
import userController from '../../src/controllers/userController';
import userService from '../../src/services/userService';

jest.mock('services/userService');

describe('User Controller', () => {
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

  describe('Change User Preferences', () => {
    beforeEach(() => {
      context.userPreferences = {
        preferredMaxGameCost: random.int(1, 10),
        countryId: random.int(1, 10),
        preferredPlatformId: random.int(1, 10),
        hasNotificationsTurnedOn: random.boolean(),
      };
    });

    it('Makes a call to the service in order to change the preferences and returns a succesful response', async () => {
      const userId = random.int();
      context.req.body = context.userPreferences;
      context.req.user.user_id = userId;

      await userController.changeUserPreferences(context.req, context.res, context.next);

      expect(userService.changeUserPreferences).toHaveBeenCalledWith(userId, context.userPreferences);
      expect(context.res.statusCode).toEqual(HttpStatuses.Success);

      expect(context.res._getJSONData().message).toEqual(SuccessMessages.ChangeUserPreferences);
    });

    it('Returns a successful response even if just one preference to change is sent', async () => {
      const userId = random.int();
      const preferences = { preferredMaxGameCost: random.int(1, 10) };
      context.req.body = preferences;
      context.req.user.user_id = userId;

      await userController.changeUserPreferences(context.req, context.res, context.next);

      expect(userService.changeUserPreferences).toHaveBeenCalledWith(userId, preferences);
      expect(context.res.statusCode).toEqual(HttpStatuses.Success);

      expect(context.res._getJSONData().message).toEqual(SuccessMessages.ChangeUserPreferences);
    });

    it('Returns validation messages when at least one of the preference values is incorrect', async () => {
      const userId = random.int();
      const preferences = { preferredMaxGameCost: random.int(-1, -10), countryId: random.int(1, 10) };
      context.req.body = preferences;
      context.req.user.user_id = userId;


      try {
        await userController.changeUserPreferences(context.req, context.res, context.next);
      } catch (error) {
        expect(error.name).toBe('ValidationError');
      }

      expect.hasAssertions();
    });
  });
});
