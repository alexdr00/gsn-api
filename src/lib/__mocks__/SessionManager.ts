import SessionManager from 'lib/SessionManager';

jest.mock('lib/SessionManager', () => ({
  set: jest.fn(),
  get: jest.fn(),
  revoke: jest.fn(),
}));

export default SessionManager;
