import ErrorResponseStrategy from './ErrorResponseStrategy';
import HttpStatuses from '../../types/enums/HttpStatuses';

class ValidationError implements ErrorResponseStrategy {
  createErrorResponse() {
    return {
      statusCode: HttpStatuses.BadRequest,
      error: {
        messages: [
          {
            name: 'Validation Error', body: 'Sorry, validtion internal error',
          },
        ],
      },
    };
  }
}

export default new ValidationError();
