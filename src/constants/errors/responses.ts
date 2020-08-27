const ResponseErrors = {
  InternalError: {
    name: 'InternalError',
    message: 'Something went wrong, please try again. Contact support if the issue persists.',
  },
  InvalidBearerToken: {
    name: 'Unauthorized',
    message: 'A valid bearer token was not provided',
  },
  AlreadySignedOut: {
    name: 'Unauthorized',
    message: 'You are already signed out',
  },
  SessionExpired: {
    name: 'SessionExpired',
    message: 'Your session has expired',
  },
  GameAlreadyBeingFollowed: {
    name: 'UnprocessableEntity',
    message: 'You are already following this game',
  },
};

export default ResponseErrors;
