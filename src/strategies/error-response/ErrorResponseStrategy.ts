import { ErrorResponse } from '../../types/interfaces/apiResponse';

abstract class ErrorResponseStrategy {
  abstract createErrorResponse(error: Error): ErrorResponse;
}

export default ErrorResponseStrategy;
