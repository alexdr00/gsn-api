import ErrorResponseStrategy from './ErrorResponseStrategy';
import HttpStatuses from '../../types/enums/HttpStatuses';
import { ErrorResponse } from '../../types/interfaces/apiResponse';

class InternalError implements ErrorResponseStrategy {
  createErrorResponse(): ErrorResponse {
    return {
      statusCode: HttpStatuses.InternalError,
      error: {
        title: 'Internal Error',
        detail: 'Something went wrong, please try again. Contact support if the issue persists.',
      },
    };
  }
}

export default new InternalError();
