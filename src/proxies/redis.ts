import redis from 'redis';
import verror from './verror';
import Logger from '../lib/Logger';


class Redis {
  public client: any;

  constructor() {
    this.client = redis.createClient({
      host: process.env.REDIS_HOST || '127.0.0.1',
    });

    this.client.on('connect', () => {
      Logger.success('Redis connected successfully.');
    });

    this.client.on('error', (error: Error) => {
      Logger.error(verror.createError(error));
    });
  }
}

export default new Redis();
