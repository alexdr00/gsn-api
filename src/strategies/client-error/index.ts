import JoiValidationError from './JoiValidationError';
import InternalError from './InternalError';
import ValidationError from './ValidationError';

class ClientError {
  public static getError(error: any) {
    const strategyMap: any = {
      ValidationError: error.isJoi ? JoiValidationError : ValidationError,
    };

    const defaultClientError = InternalError;
    const clientError = strategyMap[error.name] || defaultClientError;

    return clientError.makeError(error);
  }
}

export default ClientError;
