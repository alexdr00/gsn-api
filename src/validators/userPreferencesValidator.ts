import Joi from '../proxies/joi';
import { UserPreferencesBody } from '../types/interfaces/userPreferences';

const userPreferencesSchema = Joi.object({
  preferredMaxGameCost: Joi.number().positive(),
  countryId: Joi.number().integer().positive(),
  preferredPlatformId: Joi.number().integer().positive(),
  hasNotificationsTurnedOn: Joi.boolean(),
});

class UserPreferencesValidator {
  public changeUserPreferences(signUpBody: UserPreferencesBody) {
    const validation = userPreferencesSchema.validate(signUpBody);

    if (validation.error) {
      throw validation.error;
    }

    return validation.value;
  }
}

export default new UserPreferencesValidator();
