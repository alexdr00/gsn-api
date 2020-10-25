import { ErrorResponseNames } from '../../types/enums/Errors';

const ResponseErrors = {
  InternalError: {
    name: ErrorResponseNames.InternalError,
    message: 'Something went wrong, please try again. Contact support if the issue persists.',
  },
  InvalidBearerToken: {
    name: ErrorResponseNames.Unauthorized,
    message: 'A valid bearer token was not provided',
  },
  AlreadySignedOut: {
    name: ErrorResponseNames.Unauthorized,
    message: 'You are already signed out',
  },
  SessionExpired: {
    name: ErrorResponseNames.SessionExpired,
    message: 'Your session has expired',
  },
  GameAlreadyBeingFollowed: {
    name: ErrorResponseNames.UnprocessableEntity,
    message: 'You are already following this game',
  },
};

export default ResponseErrors;
