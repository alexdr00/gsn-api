import ErrorResponseStrategy from './ErrorResponseStrategy';
import HttpStatuses from '../../types/enums/HttpStatuses';

class JoiValidationError implements ErrorResponseStrategy {
  createErrorResponse() {
    return {
      statusCode: HttpStatuses.BadRequest,
      error: {
        messages: [
          {
            name: 'Bad Request', body: 'Sorry, validation joi error',
          },
        ],
      },
    };
  }
}

export default new JoiValidationError();
