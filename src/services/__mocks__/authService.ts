import authService from 'services/authService';

jest.mock('services/authService', () => ({
  signUp: jest.fn(),
  signIn: jest.fn(),
  getUserSessionFromBearerToken: jest.fn(),
  signOut: jest.fn(),
  refreshIdToken: jest.fn(),
}));

export default authService;
