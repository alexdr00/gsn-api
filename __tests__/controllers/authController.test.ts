import authService from 'services/authService';
import authController from 'controllers/authController';
import httpMock from 'node-mocks-http';
import HttpStatuses from 'types/enums/HttpStatuses';
import SuccessMessages from 'constants/success';
import { mocked } from 'ts-jest/utils';
import mockSession from '../reusableMocks/mockSession';

jest.mock('services/authService');

describe('Auth Controller', () => {
  const context: Record<string, any> = {};

  const mockHttp = () => {
    context.req = httpMock.createMocks().req;
    context.res = httpMock.createMocks().res;
    context.next = jest.fn().mockImplementation((err) => { throw err; });
  };

  const setupGlobalContext = () => {
    context.session = mockSession;
    context.email = 'testemail@test.com';
    context.session.email = context.email;
  };

  beforeEach(() => {
    setupGlobalContext();
    mockHttp();
  });

  describe('Sign Up', () => {
    beforeEach(() => {
      context.signUpBody = {
        email: 'email@test.com',
        name: 'name test',
        password: 'Test password1',
      };
    });

    it('Returns a successful response when everything goes right', async () => {
      context.req.body = context.signUpBody;

      await authController.signUp(context.req, context.res, context.next);

      expect(authService.signUp).toHaveBeenCalledWith(context.signUpBody);
      expect(context.res.statusCode).toEqual(HttpStatuses.Created);

      expect(context.res._getJSONData().message).toEqual(SuccessMessages.SignUp);
    });

    it('Returns validation messages when the body is incomplete', async () => {
      context.req.body = {};

      try {
        await authController.signUp(context.req, context.res, context.next);
      } catch (error) {
        expect(error.name).toBe('ValidationError');
      }

      expect.hasAssertions();
    });
  });

  describe('Sign In', () => {
    beforeEach(() => {
      context.signInBody = {
        email: 'email@test.com',
        password: 'Test password1',
      };
    });

    it('Returns the tokens object as response', async () => {
      const refreshToken = 'mock.refresh.token';
      const idToken = 'mock.id.token';
      const tokens = { idToken, refreshToken };

      context.req.body = context.signInBody;
      mocked(authService.signIn).mockResolvedValue(tokens);

      await authController.signIn(context.req, context.res, context.next);
      expect(authService.signIn).toHaveBeenCalledWith(context.signInBody);
      expect(context.res.statusCode).toEqual(HttpStatuses.Success);

      expect(context.res._getJSONData().message).toEqual(SuccessMessages.SignIn);
      expect(context.res._getJSONData().payload).toEqual(tokens);
    });

    it('Returns validation messages when the body is incomplete', async () => {
      context.req.body = {};

      try {
        await authController.signIn(context.req, context.res, context.next);
      } catch (error) {
        expect(error.name).toBe('ValidationError');
      }

      expect.hasAssertions();
    });
  });

  describe('Check user is authenticated', () => {
    beforeEach(() => {
      context.bearerToken = 'mock.bearer.token';
    });

    it('Calls a service to get the user session by a bearer token', async () => {
      context.req.headers.authorization = context.bearerToken;

      await authController.checkIsAuthenticated(context.req, context.res, context.next);

      expect(authService.getUserSessionFromBearerToken).toHaveBeenCalledWith(context.bearerToken);
    });

    it('Returns a successful response', async () => {
      context.req.headers.authorization = context.bearerToken;

      await authController.checkIsAuthenticated(context.req, context.res, context.next);

      expect(context.res.statusCode).toEqual(HttpStatuses.Success);

      expect(context.res._getJSONData().message).toEqual(SuccessMessages.CheckIsAuthenticated);
      expect(context.res._getJSONData().payload).toEqual(true);
    });
  });

  describe('Refresh id token', () => {
    beforeEach(() => {
      context.req.user = context.session;
    });

    it('Calls a service to refresh ad idToken passing the refresh token and the email', async () => {
      const refreshToken = 'mock.refresh.token';
      context.req.body = { refreshToken };

      await authController.refreshIdToken(context.req, context.res, context.next);

      expect(authService.refreshIdToken).toHaveBeenCalledWith(refreshToken, context.email);
    });

    it('Returns a tokens object as response which is the result of the service', async () => {
      const refreshToken = 'mock.refresh.token';
      const idToken = 'mock.id.token';
      const tokens = { idToken, refreshToken };
      context.req.body = { refreshToken };

      mocked(authService.refreshIdToken).mockResolvedValue(tokens);

      await authController.refreshIdToken(context.req, context.res, context.next);

      expect(context.res.statusCode).toEqual(HttpStatuses.Success);
      expect(context.res._getJSONData().message).toEqual(SuccessMessages.RefreshIdToken);
      expect(context.res._getJSONData().payload).toEqual(tokens);
    });

    it('Returns validation messages when the body is incomplete', async () => {
      context.req.body = {};

      try {
        await authController.refreshIdToken(context.req, context.res, context.next);
      } catch (error) {
        expect(error.name).toBe('ValidationError');
      }

      expect.hasAssertions();
    });
  });

  describe('Sign out', () => {
    beforeEach(() => {
      context.req.user = context.session;
    });

    it('Calls the sign out service with the email which comes from the session', async () => {
      await authController.signOut(context.req, context.res, context.next);
      expect(authService.signOut).toHaveBeenCalledWith(context.email);
    });

    it('Returns a successful response', async () => {
      await authController.signOut(context.req, context.res, context.next);

      expect(context.res.statusCode).toEqual(HttpStatuses.Success);
      expect(context.res._getJSONData().message).toEqual(SuccessMessages.SignOut);
    });
  });
});
