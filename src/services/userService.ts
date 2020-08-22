import verror from '../proxies/verror';
import ServiceErrors from '../constants/errors/services';
import userRepo from '../repositories/userRepo';
import { UserPreferences } from '../types/interfaces/user';

class UserService {
  public async changeUserPreferences(userId: number, userPreferences: UserPreferences) {
    try {
      await userRepo.changeUserPreferences(userId, userPreferences);
    } catch (error) {
      const {
        preferredMaxGameCost,
        countryId,
        preferredPlatformId,
        hasNotificationsTurnedOn,
      } = userPreferences;

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

export default new UserService();
