const ResponseErrors = {
  InternalError: {
    name: 'Internal Error',
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
    name: 'Unauthorized',
    message: 'Your session has expired',
  },
};

export default ResponseErrors;
