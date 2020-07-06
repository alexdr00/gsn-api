import joiValidationError from './joiValidationError';
import internalError from './internalError';
import validationError from './validationError';
import unprocessableEntityError from './unprocessableEntityError';

class ErrorResponse {
  public static createErrorResponse(error: any) {
    const errorTypesByName: any = {
      ValidationError: error.isJoi ? joiValidationError : validationError,
      UsernameExistsException: unprocessableEntityError,
    };

    const defaultErrorType = internalError;
    const errorType = errorTypesByName[error.name] || defaultErrorType;

    return errorType.createErrorResponse(error);
  }
}

export default ErrorResponse;
