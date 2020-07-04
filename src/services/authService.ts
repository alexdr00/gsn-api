import { SignUpBody } from '../types/interfaces/auth';
import cognito from '../proxies/aws/cognito';
import verror from '../proxies/verror';
import userRepo from '../repositories/userRepo';
import ServiceErrors from '../constants/errors/services';

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
}

export default new AuthService();
