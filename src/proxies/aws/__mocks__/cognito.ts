import cognito from 'proxies/aws/cognito';

jest.mock('proxies/aws/cognito', () => ({
  signUp: jest.fn(),
  signIn: jest.fn(),
  refreshIdToken: jest.fn(),
  signOut: jest.fn(),
}));

export default cognito;
