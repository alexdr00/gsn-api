import verror from '../proxies/verror';
import ResponseErrors from '../constants/errors/responses';
import StepErrors from '../constants/errors/steps';

function throwSessionExpiredError(originEndpoint: string): never {
  try {
    const isSignOutEndpoint = originEndpoint.includes('/auth/sign-out');
    if (isSignOutEndpoint) {
      throw verror.createError({
        name: ResponseErrors.AlreadySignedOut.name,
        message: ResponseErrors.AlreadySignedOut.message,
      });
    }

    throw verror.createError({
      name: ResponseErrors.SessionExpired.name,
      message: ResponseErrors.SessionExpired.message,
    });
  } catch (error) {
    throw verror.createError({
      name: StepErrors.ThrowSessionExpiredError.name,
      message: StepErrors.ThrowSessionExpiredError.message,
      cause: error,
      debugParams: { originEndpoint },
    });
  }
}

export default throwSessionExpiredError;
