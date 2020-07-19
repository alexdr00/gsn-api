import StepErrors from 'constants/errors/steps';
import decodeBearerToken from 'steps/decodeBearerToken';
import axios from 'axios';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { mocked } from 'ts-jest/utils';
import verror from 'proxies/verror';
import mockSession from '../reusableMocks/mockSession';


jest.mock('axios');
jest.mock('jwk-to-pem');
jest.mock('jsonwebtoken');
jest.mock('proxies/verror');

describe('Decode bearer token', () => {
  const context: Record<string, any> = {};

  const setupContext = () => {
    context.decodedTokenMock = mockSession;
  };

  beforeEach(() => {
    setupContext();

    mocked(axios.get).mockResolvedValue({ data: { keys: ['jwks-mock1', 'jwks-mock2'] } });
    mocked(jwt.verify).mockImplementation((token, pem, options, callback) => callback!(null, context.decodedTokenMock));
  });

  it('Decodes a given bearer token', async () => {
    const verifyOptions = { ignoreExpiration: true };
    const idToken = 'token.mock';
    const bearerToken = `Bearer ${idToken}`;
    const result = await decodeBearerToken(bearerToken, verifyOptions);

    const verifyCallArgs = mocked(jwt.verify).mock.calls[0];
    const idTokenPassed = verifyCallArgs[0];
    const optionsPassed = verifyCallArgs[2];

    expect(idTokenPassed).toBe(idToken);
    expect(optionsPassed).toEqual({ algorithms: ['RS256'], ...verifyOptions });
    expect(result).toEqual(context.decodedTokenMock);
  });

  it('Throws a descriptive error if something fails', async () => {
    mocked(jwt.verify).mockImplementation((token, pem, options, callback) => callback!(new JsonWebTokenError('error'), undefined));
    mocked(verror.createError).mockImplementation((error) => { throw error; });
    const idToken = 'token.mock';
    const bearerToken = `Bearer ${idToken}`;

    try {
      await decodeBearerToken(bearerToken);
    } catch (error) {
      expect(error.name).toBe(StepErrors.DecodeBearerToken.name);
      expect(error.message).toBe(StepErrors.DecodeBearerToken.message);
    }

    expect.hasAssertions();
  });
});
