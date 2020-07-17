import { SignInBody, SignUpBody } from '../types/interfaces/auth';
import cognito from '../proxies/aws/cognito';
import verror from '../proxies/verror';
import userRepo from '../repositories/userRepo';
import ServiceErrors from '../constants/errors/services';
import SessionManager from '../lib/SessionManager';
import { Session, Tokens } from '../types/interfaces/session';
import checkBearerTokenIsValid from '../steps/checkBearerTokenIsValid';
import decodeBearerToken from '../steps/decodeBearerToken';
import throwSessionExpiredError from '../steps/throwSessionExpiredError';

class AuthService {
  public async signUp(signUpBody: SignUpBody) {
    const { email, name } = signUpBody;

    try {
      await cognito.signUp(signUpBody);
      await userRepo.createUser({ email, name });
    } catch (error) {
      throw verror.createError({
        name: ServiceErrors.SignUp.name,
        message: ServiceErrors.SignUp.message,
        cause: error,
        debugParams: { email, name },
      });
    }
  }

  public async signIn(signInBody: SignInBody): Promise<Tokens> {
    const { email } = signInBody;

    try {
      const cognitoSession = await cognito.signIn(signInBody);
      await SessionManager.set(cognitoSession.session);
      return cognitoSession.tokens;
    } catch (error) {
      throw verror.createError({
        name: ServiceErrors.SignIn.name,
        message: ServiceErrors.SignIn.message,
        cause: error,
        debugParams: { email },
      });
    }
  }

  public async refreshIdToken(refreshToken: string, email: string): Promise<Tokens> {
    try {
      const { tokens, session } = await cognito.refreshIdToken(refreshToken, email);
      await SessionManager.set(session);
      return tokens;
    } catch (error) {
      throw verror.createError({
        name: ServiceErrors.RefreshIdToken.name,
        message: ServiceErrors.RefreshIdToken.message,
        cause: error,
        debugParams: { email },
      });
    }
  }

  public async signOut(email: string): Promise<void> {
    try {
      cognito.signOut(email);
      await SessionManager.revoke(email);
    } catch (error) {
      throw verror.createError({
        name: ServiceErrors.SignOut.name,
        message: ServiceErrors.SignOut.message,
        cause: error,
        debugParams: { email },
      });
    }
  }

  public async getUserSessionFromBearerToken(bearerToken: string | undefined, originEndpoint = ''): Promise<Session> {
    try {
      checkBearerTokenIsValid(bearerToken);
      const isRefreshTokenEndpoint = originEndpoint.includes('/auth/refresh-token');

      const bearerTokenDecoded = await decodeBearerToken(bearerToken!, { ignoreExpiration: isRefreshTokenEndpoint });
      const redisSession = await SessionManager.get(bearerTokenDecoded.email);
      if (redisSession === null) {
        throwSessionExpiredError(originEndpoint);
      }

      return redisSession;
    } catch (error) {
      throw verror.createError({
        name: ServiceErrors.GetUserSessionFromBearerToken.name,
        message: ServiceErrors.GetUserSessionFromBearerToken.message,
        cause: error,
        debugParams: { originEndpoint },
      });
    }
  }
}

export default new AuthService();
