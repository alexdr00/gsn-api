import authService from 'services/authService';

jest.mock('services/authService', () => ({
  signUp: jest.fn(),
  signIn: jest.fn(),
}));

export default authService;
