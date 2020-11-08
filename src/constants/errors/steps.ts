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
  GetPsnStoreSearchResults: {
    name: 'GetPsnStoreSearchResults',
    message: 'Failed to get PSN store search results with the specifed game',
  },
  GetPsnGameUrlFromSearchResults: {
    name: 'GetPsnGameUrlFromSearchResults',
    message: 'Failed to get the PSN game url',
  },
  GetGamesPrices: {
    name: 'GetGamesPrices',
    message: 'Failed to get the provided game prices',
  },
};

export default StepErrors;
