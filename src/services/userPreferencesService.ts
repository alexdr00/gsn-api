import verror from '../proxies/verror';
import ServiceErrors from '../constants/errors/services';
import { UserPreferencesBody } from '../types/interfaces/userPreferences';

class UserPreferencesService {
  public async changeUserPreferences(userPreferencesBody: UserPreferencesBody) {
    const {
      preferredMaxGameCost,
      countryId,
      preferredPlatformId,
      hasNotificationsTurnedOn,
    } = userPreferencesBody;

    try {
      console.log(userPreferencesBody);
    } catch (error) {
      throw verror.createError({
        name: ServiceErrors.ChangeUserPreferences.name,
        message: ServiceErrors.ChangeUserPreferences.message,
        cause: error,
        debugParams: {
          preferredMaxGameCost,
          countryId,
          preferredPlatformId,
          hasNotificationsTurnedOn,
        },
      });
    }
  }
}

export default new UserPreferencesService();
