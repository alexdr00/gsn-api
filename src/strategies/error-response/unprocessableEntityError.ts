import ErrorResponseStrategy from './ErrorResponseStrategy';
import HttpStatuses from '../../types/enums/HttpStatuses';
import { ErrorResponse } from '../../types/interfaces/apiResponse';

class UnprocessableEntity implements ErrorResponseStrategy {
  createErrorResponse(error: Error): ErrorResponse {
    return {
      statusCode: HttpStatuses.UnprocessableEntity,
      error: {
        detail: error.message,
      },
    };
  }
}

export default new UnprocessableEntity();
