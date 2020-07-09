import ErrorResponseStrategy from './ErrorResponseStrategy';
import HttpStatuses from '../../types/enums/HttpStatuses';
import { ErrorResponse } from '../../types/interfaces/apiResponse';
import ResponseErrors from '../../constants/errors/responses';

class InternalError implements ErrorResponseStrategy {
  createErrorResponse(): ErrorResponse {
    return {
      statusCode: HttpStatuses.InternalError,
      error: {
        title: ResponseErrors.InternalError.name,
        detail: ResponseErrors.InternalError.message,
      },
    };
  }
}

export default new InternalError();
