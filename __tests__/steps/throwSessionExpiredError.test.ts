import throwSessionExpiredError from 'steps/throwSessionExpiredError';
import StepErrors from 'constants/errors/steps';
import { mocked } from 'ts-jest/utils';
import verror from 'proxies/verror';
import ResponseErrors from '../../src/constants/errors/responses';

jest.mock('proxies/verror');

describe('Throw session expired error', () => {
  beforeEach(() => {
    mocked(verror.createError).mockImplementation((error) => { throw error; });
  });

  it('This function always returns an error', () => {
    const originEndpoint = '';
    try {
      throwSessionExpiredError(originEndpoint);
    } catch (error) {
      expect(error.name).toEqual(StepErrors.ThrowSessionExpiredError.name);
      expect(error.message).toEqual(StepErrors.ThrowSessionExpiredError.message);
    }
    expect.hasAssertions();
  });

  it('Throws a session expired error if origin endpoint is not sign-out', () => {
    const originEndpoint = '';
    try {
      throwSessionExpiredError(originEndpoint);
    } catch (error) {
      const firstCreateErrorCall = mocked(verror.createError).mock.calls[0];
      const errorArg = firstCreateErrorCall[0];
      expect(errorArg).toHaveProperty('name', ResponseErrors.SessionExpired.name);
      expect(errorArg).toHaveProperty('message', ResponseErrors.SessionExpired.message);
    }

    expect.hasAssertions();
  });

  it('Throws a user already signed out error if origin endpoint is sign-out', () => {
    const originEndpoint = 'v1/auth/sign-out';

    try {
      throwSessionExpiredError(originEndpoint);
    } catch (error) {
      const firstCreateErrorCall = mocked(verror.createError).mock.calls[0];
      const errorArg = firstCreateErrorCall[0];
      expect(errorArg).toHaveProperty('name', ResponseErrors.AlreadySignedOut.name);
      expect(errorArg).toHaveProperty('message', ResponseErrors.AlreadySignedOut.message);
    }

    expect.hasAssertions();
  });
});
