import joiValidationError from './joiValidationError';
import internalError from './internalError';
import validationError from './validationError';

class ErrorResponse {
  public static createErrorResponse(error: any) {
    const errorTypesByName: any = {
      ValidationError: error.isJoi ? joiValidationError : validationError,
    };

    const defaultErrorType = internalError;
    const errorType = errorTypesByName[error.name] || defaultErrorType;

    return errorType.createErrorResponse(error);
  }
}

export default ErrorResponse;
