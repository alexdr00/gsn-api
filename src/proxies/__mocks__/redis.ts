import redis from 'proxies/redis';

jest.mock('proxies/redis', () => ({
  client: {
    set: jest.fn().mockImplementation((key, value, callback) => callback()),
    get: jest.fn().mockImplementation((key, callback) => callback(undefined, '')),
    del: jest.fn().mockImplementation((key, callback) => callback()),
  },
}));

export default redis;
