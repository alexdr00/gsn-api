import pg from '../../../src/proxies/db/pg';

class PriceHistorySchema {
  static async run() {
    const query = `
      CREATE TABLE IF NOT EXISTS "price_history" (
        id SERIAL PRIMARY KEY,
        game_id INT,
        platform_id INT,
        price BIGINT,
        striked_price BIGINT,
        timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_game
          FOREIGN KEY (game_id)
          REFERENCES game(id)
          ON DELETE CASCADE,

        CONSTRAINT fk_platform
          FOREIGN KEY (platform_id)
          REFERENCES platform(id)
          ON DELETE CASCADE
      );
    `;

    await pg.query(query, [], { queryId: 'Migration.PriceHistorySchema' });
  }
}

export default PriceHistorySchema;
