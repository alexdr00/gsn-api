import SessionManager from 'lib/SessionManager';
import redis from 'proxies/redis';
import mockSession from '../reusableMocks/mockSession';

jest.mock('proxies/redis');

describe('lib/SessionManager', () => {
  const context: Record<string, any> = {};

  const setupContext = () => {
    context.session = mockSession;
  };

  beforeEach(() => {
    setupContext();
  });

  describe('set', () => {
    it('Makes a call to the redis client in order to set the incoming session as a string and the the user\'s email as the key', async () => {
      const userEmail = 'test@test.com';
      context.session.email = userEmail;
      await SessionManager.set(context.session);
      const sessionKey = redis.client.set.mock.calls[0][0];
      const sessionStringified = redis.client.set.mock.calls[0][1];

      expect(sessionKey).toBe(userEmail);
      expect(sessionStringified).toBe(JSON.stringify(context.session));
    });
  });

  describe('get', () => {
    it('Makes a call to the redis client in order to get the user\'s session by its email', async () => {
      const sessionStringified = JSON.stringify(context.session);
      const userEmail = 'test@test.com';
      redis.client.get = jest.fn().mockImplementation((key, callback) => callback(null, sessionStringified));

      await SessionManager.get(userEmail);
      const sessionKey = redis.client.get.mock.calls[0][0];

      expect(sessionKey).toBe(userEmail);
    });

    it('Resolves the session as a parsed JSON object', async () => {
      const sessionStringified = JSON.stringify(context.session);
      redis.client.get = jest.fn().mockImplementation((key, callback) => callback(null, sessionStringified));

      const userEmail = 'test@test.com';
      const sessionParsed = await SessionManager.get(userEmail);

      expect(sessionParsed).toStrictEqual(context.session);
    });
  });

  describe('revoke', () => {
    it('Makes a call to the redis client in order to delete the user\'s session by its email', async () => {
      const userEmail = 'test@test.com';

      await SessionManager.revoke(userEmail);
      const sessionKey = redis.client.del.mock.calls[0][0];

      expect(sessionKey).toBe(userEmail);
    });
  });
});
