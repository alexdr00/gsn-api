import ErrorResponseStrategy from './ErrorResponseStrategy';
import HttpStatuses from '../../types/enums/HttpStatuses';

class InternalError implements ErrorResponseStrategy {
  createErrorResponse() {
    return {
      statusCode: HttpStatuses.InternalError,
      error: {
        messages: [
          {
            name: 'Internal Error', body: 'Sorry, internal error, we are working on it',
          },
        ],
      },
    };
  }
}

export default new InternalError();
