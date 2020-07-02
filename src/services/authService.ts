import { SignUpBody } from '../types/interfaces/auth';
import cognito from '../proxies/aws/cognito';

class AuthService {
  public async signUp(signUpBody: SignUpBody) {
    try {
      await cognito.signUp(signUpBody);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new AuthService();
