import { Request } from 'express';
import { Session } from './interfaces/session';

declare module 'express' {
  interface Request {
    user?: Session
  }
}
