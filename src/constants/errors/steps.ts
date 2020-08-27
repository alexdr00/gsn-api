const StepErrors = {
  CheckBearerTokenIsValid: {
    name: 'CheckBearerTokenIsValid',
    message: 'The bearer token is not valid',
  },
  InsertPlatformsByGame: {
    name: 'InsertPlatformsByGame',
    message: 'Failed to insert platforms by game',
  },
  DecodeBearerToken: {
    name: 'DecodeBearerToken',
    message: 'Failed to decode the id-token',
  },
  ThrowSessionExpiredError: {
    name: 'ThrowSessionExpiredError',
    message: 'Expected throw of Session Expired error',
  },
};

export default StepErrors;
