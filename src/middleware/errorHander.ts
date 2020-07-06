import { Request, Response, NextFunction } from 'express';
import verror from '../proxies/verror';
import Logger from '../lib/Logger';
import ErrorResponse from '../strategies/error-response';
import HttpStatuses from '../types/enums/HttpStatuses';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  const originErrorCause = verror.getOriginCause(error);
  const errorResponse = ErrorResponse.createErrorResponse(originErrorCause);

  const shouldSendToCloudWatch = errorResponse.statusCode === HttpStatuses.InternalError;
  Logger.error(error, undefined, shouldSendToCloudWatch);
  res.status(errorResponse.statusCode).json({ error: errorResponse.error });
};

export default errorHandler;
