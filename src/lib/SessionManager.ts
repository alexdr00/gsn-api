import redis from '../proxies/redis';
import { Session } from '../types/interfaces/session';

class SessionManager {
  public static async set(session: Session): Promise<void> {
    const sessionKey = session.email;
    const sessionString = JSON.stringify(session);
    return new Promise((resolve, reject) => {
      redis.client.set(sessionKey, sessionString, (err: Error) => {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });
  }

  public static async get(email: string): Promise<Session | null> {
    return new Promise((resolve, reject) => {
      redis.client.get(email, (err: Error, sessionString: string) => {
        if (err) {
          reject(err);
        }

        const sessionParsed = JSON.parse(sessionString);
        resolve(sessionParsed);
      });
    });
  }

  public static async revoke(email: string): Promise<void> {
    return new Promise((resolve, reject) => {
      redis.client.del(email, (err: Error) => {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });
  }
}

export default SessionManager;
