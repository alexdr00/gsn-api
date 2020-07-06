import { ValidationError } from '@hapi/joi';
import ErrorResponseStrategy from './ErrorResponseStrategy';
import HttpStatuses from '../../types/enums/HttpStatuses';
import { ValidationErrorResponse } from '../../types/interfaces/apiResponse';

class JoiValidationError implements ErrorResponseStrategy {
  createErrorResponse(error: ValidationError): ValidationErrorResponse {
    return {
      statusCode: HttpStatuses.BadRequest,
      error: {
        details: error.details.map((detail) => detail.message),
      },
    };
  }
}

export default new JoiValidationError();
