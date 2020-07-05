import { Request, Response, NextFunction } from 'express';
import verror from '../proxies/verror';
import Logger from '../lib/Logger';
import ErrorResponse from '../strategies/error-response';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  Logger.error(error);
  const originErrorCause = verror.getOriginCause(error);
  const errorResponse = ErrorResponse.createErrorResponse(originErrorCause);

  res.status(errorResponse.statusCode).json({ error: errorResponse.error });
};

export default errorHandler;
