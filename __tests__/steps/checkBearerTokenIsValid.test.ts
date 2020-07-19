import checkBearerTokenIsValid from 'steps/checkBearerTokenIsValid';
import StepErrors from 'constants/errors/steps';

describe('Check bearer token is valid', () => {
  it('Throws error if no bearer token is provided', () => {
    const bearerToken = '';
    try {
      checkBearerTokenIsValid(bearerToken);
    } catch (error) {
      expect(error.name).toBe(StepErrors.CheckBearerTokenIsValid.name);
      expect(error.message).toBe(StepErrors.CheckBearerTokenIsValid.message);
    }

    expect.hasAssertions();
  });

  it('Throws error if bearer token does not start with "Bearer "', () => {
    const bearerToken = 'Token';
    try {
      checkBearerTokenIsValid(bearerToken);
    } catch (error) {
      expect(error.name).toBe(StepErrors.CheckBearerTokenIsValid.name);
      expect(error.message).toBe(StepErrors.CheckBearerTokenIsValid.message);
    }

    expect.hasAssertions();
  });

  it('Should not throw any error if the bearer token is correct', () => {
    const bearerToken = 'Bearer mock.token.here';
    checkBearerTokenIsValid(bearerToken);
  });
});
