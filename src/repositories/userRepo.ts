import { NewUserData } from '../types/interfaces/user';
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
}

export default new UserRepo();
