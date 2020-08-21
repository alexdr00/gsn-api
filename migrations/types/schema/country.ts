import pg from '../../../src/proxies/db/pg';

class CountrySchema {
  static async run() {
    const query = `
      CREATE TABLE IF NOT EXISTS "country" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        currency VARCHAR(3) NOT NULL,
        language VARCHAR(2) NOT NULL,
        iso VARCHAR(2) NOT NULL
      );
    `;

    await pg.query(query, [], { queryId: 'Migration.CountrySchema' });
  }
}

export default CountrySchema;
