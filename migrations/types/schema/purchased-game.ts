import pg from '../../../src/proxies/db/pg';

class PurchasedGameSchema {
  static async run() {
    const query = `
      CREATE TABLE IF NOT EXISTS "purchased_game" (
        id SERIAL PRIMARY KEY,
        game_id INT,
        user_id INT,
        price_history_id INT,

        CONSTRAINT fk_game
          FOREIGN KEY (game_id)
          REFERENCES game(id)
          ON DELETE CASCADE,

        CONSTRAINT fk_user
          FOREIGN KEY (user_id)
          REFERENCES "user"(id)
          ON DELETE CASCADE,
          
        CONSTRAINT fk_price_history
          FOREIGN KEY (price_history_id)
          REFERENCES price_history(id)
          ON DELETE CASCADE
      );
    `;

    await pg.query(query, [], { queryId: 'Migration.PurchasedGameSchema' });
  }
}

export default PurchasedGameSchema;
