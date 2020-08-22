import userService from 'services/userService';
import userRepo from 'repositories/userRepo';
import { mocked } from 'ts-jest/utils';
import ServiceErrors from 'constants/errors/services';
import random from 'random';

jest.mock('repositories/userRepo');

describe('User Service', () => {
  const context: Record<string, any> = {};

  describe('Change User Preferences', () => {
    beforeEach(() => {
      context.userPreferences = {
        preferredMaxGameCost: random.int(1, 10),
        countryId: random.int(1, 10),
        preferredPlatformId: random.int(1, 10),
        hasNotificationsTurnedOn: random.boolean(),
      };
      context.userId = random.int(1, 10);
    });

    it('Makes a call to the repo to change the user preferences', async () => {
      await userService.changeUserPreferences(context.userId, context.userPreferences);
      expect(userRepo.changeUserPreferences).toHaveBeenCalledWith(context.userId, context.userPreferences);
    });

    it('Throws a descriptive error when it fails', async () => {
      const testError = new Error('Test error here!');
      mocked(userRepo.changeUserPreferences).mockImplementation(() => { throw testError; });

      try {
        await userService.changeUserPreferences(context.userId, context.userPreferences);
      } catch (error) {
        expect(error.name).toBe(ServiceErrors.ChangeUserPreferences.name);
        expect(error.message).toBe(ServiceErrors.ChangeUserPreferences.message);
      }

      expect.hasAssertions();
    });
  });
});
