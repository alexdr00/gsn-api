import Joi from '../proxies/joi';
import { UserPreferences } from '../types/interfaces/user';

const userPreferencesSchema = Joi.object({
  preferredMaxGameCost: Joi.number().positive(),
  countryId: Joi.number().integer().positive(),
  preferredPlatformId: Joi.number().integer().positive(),
  hasNotificationsTurnedOn: Joi.boolean(),
});

class UserValidator {
  public changeUserPreferences(userPreferences: UserPreferences) {
    const validation = userPreferencesSchema.validate(userPreferences);

    if (validation.error) {
      throw validation.error;
    }

    return validation.value;
  }
}

export default new UserValidator();
