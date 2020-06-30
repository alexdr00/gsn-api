import pg from '../../../src/proxies/db/pg';

class UserSchema {
  static async run() {
    const query = `
      CREATE TABLE IF NOT EXISTS user (
        id INT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE
      );
    `;

    await pg.query(query);
  }
}

export default UserSchema;
