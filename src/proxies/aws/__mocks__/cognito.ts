import cognito from 'proxies/aws/cognito';

jest.mock('proxies/aws/cognito', () => ({
  signUp: jest.fn(),
}));

export default cognito;
