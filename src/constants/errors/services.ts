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
  ChangeUserPreferences: {
    name: 'ChangeUserPreferences',
    message: 'Failed change the user preferences',
  },
  RawgGameSearch: {
    name: 'RawgGameSearch',
    message: 'Failed to search a game with the RAWG API',
  },
  GameFollow: {
    name: 'GameFollow',
    message: 'Failed to follow a game',
  },
};

export default ServiceErrors;
