import ErrorResponseStrategy from './ErrorResponseStrategy';
import HttpStatuses from '../../types/enums/HttpStatuses';
import { ErrorResponse } from '../../types/interfaces/apiResponse';

class NotAuthorized implements ErrorResponseStrategy {
  createErrorResponse(error: Error): ErrorResponse {
    return {
      statusCode: HttpStatuses.NotAuthorized,
      error: {
        detail: error.message,
      },
    };
  }
}

export default new NotAuthorized();
