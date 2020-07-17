const ServiceErrors = {
  SignUp: {
    name: 'SignUp',
    message: 'Failed to register the user',
  },
  SignIn: {
    name: 'SignIn',
    message: 'Failed to sign in the user',
  },
  GetUserSessionFromBearerToken: {
    name: 'GetUserSessionFromBearerToken',
    message: 'Failed to check bearer token',
  },
  RefreshIdToken: {
    name: 'RefreshIdToken',
    message: 'Failed to refresh the id token',
  },
  SignOut: {
    name: 'SignOut',
    message: 'Failed to sign the user out',
  },
};

export default ServiceErrors;
