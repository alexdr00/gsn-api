import pg from '../../../src/proxies/db/pg';

class GameSchema {
  static async run() {
    const query = `
      CREATE TABLE IF NOT EXISTS "game" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        rawg_id INT,
        picture_url VARCHAR(500)
      );
    `;

    await pg.query(query, [], { queryId: 'Migration.GameSchema' });
  }
}

export default GameSchema;
