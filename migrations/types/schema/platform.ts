import pg from '../../../src/proxies/db/pg';

class PlatformSchema {
  static async run() {
    const query = `
      CREATE TABLE IF NOT EXISTS "platform" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50),
        slug VARCHAR(50),
        rawg_id INT
      );
    `;

    await pg.query(query, [], { queryId: 'Migration.PlatformSchema' });
  }
}

export default PlatformSchema;
