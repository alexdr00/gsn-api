import ErrorResponseStrategy from './ErrorResponseStrategy';
import HttpStatuses from '../../types/enums/HttpStatuses';
import { ErrorResponse } from '../../types/interfaces/apiResponse';

class NotFoundError implements ErrorResponseStrategy {
  createErrorResponse(error: Error): ErrorResponse {
    return {
      statusCode: HttpStatuses.NotFound,
      error: {
        detail: error.message,
      },
    };
  }
}

export default new NotFoundError();
