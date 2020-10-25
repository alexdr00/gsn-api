import joiValidationError from './joiValidationError';
import internalError from './internalError';
import validationError from './validationError';
import unprocessableEntityError from './unprocessableEntityError';
import notAuthorized from './notAuthorized';
import sessionExpiredError from './sessionExpiredError';
import notFoundError from './notFoundError';
import { ErrorResponseNames } from '../../types/enums/Errors';

class ErrorResponse {
  public static createErrorResponse(error: any) {
    const errorTypesByName: any = {
      [ErrorResponseNames.ValidationError]: error.isJoi ? joiValidationError : validationError,
      [ErrorResponseNames.UsernameExistsException]: unprocessableEntityError,
      [ErrorResponseNames.NotAuthorizedException]: notAuthorized,
      [ErrorResponseNames.Unauthorized]: notAuthorized,
      [ErrorResponseNames.TokenExpiredError]: notAuthorized,
      [ErrorResponseNames.JsonWebTokenError]: notAuthorized,
      [ErrorResponseNames.SessionExpired]: sessionExpiredError,
      [ErrorResponseNames.UnprocessableEntity]: unprocessableEntityError,
      [ErrorResponseNames.NotFound]: notFoundError,
    };

    const defaultErrorType = internalError;
    const errorType = errorTypesByName[error.name] || defaultErrorType;

    return errorType.createErrorResponse(error);
  }
}

export default ErrorResponse;
