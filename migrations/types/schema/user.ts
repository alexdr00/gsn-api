import pg from '../../../src/proxies/db/pg';

class UserSchema {
  static async run() {
    const query = `
      CREATE TABLE IF NOT EXISTS "user" (
        id INT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `;

    await pg.query(query, [], { queryId: 'Migration.UserSchema' });
  }
}

export default UserSchema;
