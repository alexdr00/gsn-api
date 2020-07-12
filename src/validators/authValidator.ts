import Joi from '../proxies/joi';
import { SignUpBody, SignInBody } from '../types/interfaces/auth';

const commonSchema = {
  email: Joi.string()
    .email()
    .required(),
};

const signUpSchema = Joi.object({
  ...commonSchema,
  name: Joi.string().required(),
  password: Joi.string()
    .min(6)
    .message('Password should be at least 6 chars length')

    .pattern(/[A-Z]/)
    .message('Password should contain at least 1 uppercase letter')

    .pattern(/[a-z]/)
    .message('Password should contain at least 1 lowercase letter')

    .pattern(/[0-9]/)
    .message('Password should contain at least 1 number')
    .required(),
});

const signInSchema = Joi.object({
  ...commonSchema,
  password: Joi.string().required(),
});

class AuthValidator {
  public signUp(signUpBody: SignUpBody) {
    const validation = signUpSchema.validate(signUpBody);

    if (validation.error) {
      throw validation.error;
    }

    return validation.value;
  }

  public signIn(signInBody: SignInBody) {
    const validation = signInSchema.validate(signInBody);

    if (validation.error) {
      throw validation.error;
    }

    return validation.value;
  }
}

export default new AuthValidator();
