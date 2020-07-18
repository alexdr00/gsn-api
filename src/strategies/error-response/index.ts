import joiValidationError from './joiValidationError';
import internalError from './internalError';
import validationError from './validationError';
import unprocessableEntityError from './unprocessableEntityError';
import notAuthorized from './notAuthorized';
import sessionExpiredError from './sessionExpiredError';

class ErrorResponse {
  public static createErrorResponse(error: any) {
    const errorTypesByName: any = {
      ValidationError: error.isJoi ? joiValidationError : validationError,
      UsernameExistsException: unprocessableEntityError,
      NotAuthorizedException: notAuthorized,
      Unauthorized: notAuthorized,
      TokenExpiredError: notAuthorized,
      JsonWebTokenError: notAuthorized,
      SessionExpired: sessionExpiredError,
    };

    const defaultErrorType = internalError;
    const errorType = errorTypesByName[error.name] || defaultErrorType;

    return errorType.createErrorResponse(error);
  }
}

export default ErrorResponse;
