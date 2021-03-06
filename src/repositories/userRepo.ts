import { NewUserData, User, UserPreferences } from '../types/interfaces/user';
import pg from '../proxies/db/pg';
import { Platform } from '../types/interfaces/platform';
import { Country } from '../types/interfaces/country';

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
    const [user] = await pg.query<User>(query, parameters, { queryId: 'UserRepo.getUserByEmail' });
    return user;
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

  public async getUserPreferredPlatform(userId: number): Promise<Platform> {
    const query = `
      SELECT
        platform.name,
        platform.id,
        platform.rawg_id AS "platformRawgId",
        platform.slug
      FROM "user"
      INNER JOIN platform ON "user".preferred_platform_id = platform.id
      WHERE "user".id = $1;
    `;

    const parameters = [userId];
    const [platform] = await pg.query<Platform>(query, parameters, { queryId: 'UserRepo.getUserPreferredPlatform' });
    return platform;
  }

  public async getUserCountryData(userId: number): Promise<Country> {
    const query = `
      SELECT
        country.name,
        country.id,
        country.currency,
        country.language,
        country.iso
      FROM "user"
      INNER JOIN country ON "user".country_id = country.id
      WHERE "user".id = $1;
    `;

    const parameters = [userId];
    const [countryData] = await pg.query<Country>(query, parameters, { queryId: 'UserRepo.getUserCountryData' });
    return countryData;
  }
}

export default new UserRepo();
