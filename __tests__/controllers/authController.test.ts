import authService from 'services/authService';
import authController from 'controllers/authController';
import httpMock from 'node-mocks-http';
import HttpStatuses from 'types/enums/HttpStatuses';
import SuccessMessages from 'constants/success';

jest.mock('services/authService');

describe('Auth Controller', () => {
  const context: Record<string, any> = {};

  const mockHttp = () => {
    context.req = httpMock.createMocks().req;
    context.res = httpMock.createMocks().res;
    context.next = jest.fn().mockImplementation((err) => { throw err; });
  };

  beforeEach(() => {
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

    it('Returns a successful response when everything goes right', async () => {
      context.req.body = context.signInBody;

      await authController.signIn(context.req, context.res, context.next);
      expect(authService.signIn).toHaveBeenCalledWith(context.signInBody);
      expect(context.res.statusCode).toEqual(HttpStatuses.Success);

      expect(context.res._getJSONData().message).toEqual(SuccessMessages.SignIn);
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
});
