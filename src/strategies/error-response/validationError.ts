import ErrorResponseStrategy from './ErrorResponseStrategy';
import HttpStatuses from '../../types/enums/HttpStatuses';
import { ValidationErrorResponse } from '../../types/interfaces/apiResponse';

class ValidationError implements ErrorResponseStrategy {
  createErrorResponse(): ValidationErrorResponse {
    return {
      statusCode: HttpStatuses.BadRequest,
      error: {
        details: ['Generic validation'],
      },
    };
  }
}

export default new ValidationError();
