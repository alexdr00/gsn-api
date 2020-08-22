import pg from '../../../src/proxies/db/pg';

class GameByPlatformSchema {
  static async run() {
    const query = `
      CREATE TABLE IF NOT EXISTS "game_by_platform" (
        id SERIAL PRIMARY KEY,
        game_id INT,
        platform_id INT,

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

    await pg.query(query, [], { queryId: 'Migration.GameByPlatformSchema' });
  }
}

export default GameByPlatformSchema;
