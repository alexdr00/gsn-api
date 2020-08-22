import { NewUserData, User, UserPreferences } from '../types/interfaces/user';
import pg from '../proxies/db/pg';

class UserRepo {
  public createUser(newUserData: NewUserData) {
    const { email, name } = newUserData;
    const query = `
      INSERT INTO "user" (email, name) VALUES ($1, $2)
    `;

    const parameters = [email, name];
    return pg.query(query, parameters, { queryId: 'UserRepo.createUser' });
  }

  public async getUserByEmail(email: string): Promise<User> {
    const query = `
      SELECT 
        id,
        name,
        email
      FROM 
        "user"
      WHERE
        email = $1
    `;

    const parameters = [email];
    const userResult = await pg.query<User>(query, parameters, { queryId: 'UserRepo.getUserByEmail' });
    return userResult[0];
  }

  public changeUserPreferences(userId: number, userPreferences: UserPreferences) {
    const {
      preferredMaxGameCost,
      countryId,
      preferredPlatformId,
      hasNotificationsTurnedOn,
    } = userPreferences;

    const query = `
      UPDATE "user" 
      SET 
       country_id = COALESCE($1, country_id),
       has_notifications_turned_on = COALESCE($2, has_notifications_turned_on),
       preferred_max_game_cost = COALESCE($3, preferred_max_game_cost),
       preferred_platform_id = COALESCE($4, preferred_platform_id)
      WHERE
        id = $5
    `;

    const parameters = [countryId, hasNotificationsTurnedOn, preferredMaxGameCost, preferredPlatformId, userId];
    return pg.query(query, parameters, { queryId: 'UserRepo.change' });
  }
}

export default new UserRepo();
