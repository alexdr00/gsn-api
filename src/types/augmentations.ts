import { Session } from './interfaces/session';

declare module 'express' {
  interface Request {
    user?: Session
  }
}
