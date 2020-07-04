import { Request, Response, NextFunction } from 'express';
import verror from '../proxies/verror';
import Logger from '../lib/Logger';
import ClientError from '../strategies/client-error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (error: Error, req: Request, res: Response, next: NextFunction) => {
  Logger.error(error);
  const originalCause = verror.getOriginCause(error);
  const clientError = ClientError.getError(originalCause);
  res.status(clientError.statusCode).json({ message: clientError.message });
};
