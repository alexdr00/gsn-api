import { ErrorResponse, ValidationErrorResponse } from '../../types/interfaces/apiResponse';

interface ErrorResponseStrategy {
  createErrorResponse(error: Error): ErrorResponse | ValidationErrorResponse
}

export default ErrorResponseStrategy;
