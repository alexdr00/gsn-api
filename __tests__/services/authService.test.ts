import authService from 'services/authService';
import userRepo from 'repositories/userRepo';
import cognito from 'proxies/aws/cognito';
import { mocked } from 'ts-jest/utils';
import ServiceErrors from '../../src/constants/errors/services';

jest.mock('proxies/aws/cognito');
jest.mock('repositories/userRepo');

describe('Auth Service', () => {
  const context: Record<string, any> = {};

  describe('Sign Up', () => {
    beforeEach(() => {
      context.signUpBody = {
        email: 'email@test.com',
        name: 'name test',
        password: 'Test password1',
      };
    });

    it('Makes a call to create a user in cognito', async () => {
      await authService.signUp(context.signUpBody);
      expect(cognito.signUp).toHaveBeenCalledWith(context.signUpBody);
    });

    it('Makes a call to create a user in the database', async () => {
      const { email, name } = context.signUpBody;

      await authService.signUp(context.signUpBody);
      const newUserData = { email, name };
      expect(userRepo.createUser).toHaveBeenCalledWith(newUserData);
    });

    it('Throws a descriptive error when it fails', async () => {
      const testError = new Error('Test error here!');
      mocked(cognito.signUp).mockImplementation(() => { throw testError; });

      try {
        await authService.signUp(context.signUpBody);
      } catch (error) {
        expect(error.name).toBe(ServiceErrors.SignUp.name);
        expect(error.message).toBe(ServiceErrors.SignUp.message);
      }
    });
  });
});
