import verror from '../proxies/verror';
import ResponseErrors from '../constants/errors/responses';
import StepErrors from '../constants/errors/steps';

function checkBearerTokenIsValid(bearerToken: string | undefined): void {
  try {
    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
      throw verror.createError({
        name: ResponseErrors.InvalidBearerToken.name,
        message: ResponseErrors.InvalidBearerToken.message,
      });
    }
  } catch (error) {
    throw verror.createError({
      name: StepErrors.CheckBearerTokenIsValid.name,
      message: StepErrors.CheckBearerTokenIsValid.message,
      cause: error,
      debugParams: { bearerToken },
    });
  }
}

export default checkBearerTokenIsValid;
