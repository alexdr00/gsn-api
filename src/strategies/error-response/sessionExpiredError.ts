import ErrorResponseStrategy from './ErrorResponseStrategy';
import HttpStatuses from '../../types/enums/HttpStatuses';
import { ErrorResponse } from '../../types/interfaces/apiResponse';

class SessionExpired implements ErrorResponseStrategy {
  createErrorResponse(error: Error): ErrorResponse {
    return {
      statusCode: HttpStatuses.NotAuthorized,
      error: {
        title: 'Session Expired',
        code: 'SessionExpired',
        detail: error.message,
      },
    };
  }
}

export default new SessionExpired();
