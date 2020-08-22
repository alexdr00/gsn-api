import pg from '../../../src/proxies/db/pg';

class FollowedGameSchema {
  static async run() {
    const query = `
      CREATE TABLE IF NOT EXISTS "followed_game" (
        id SERIAL PRIMARY KEY,
        game_id INT,
        user_id INT,
        
        CONSTRAINT fk_game
          FOREIGN KEY (game_id)
          REFERENCES game(id)
          ON DELETE CASCADE,

        CONSTRAINT fk_user
          FOREIGN KEY (user_id)
          REFERENCES "user"(id)
          ON DELETE CASCADE 
      );
    `;

    await pg.query(query, [], { queryId: 'Migration.FollowedGameSchema' });
  }
}

export default FollowedGameSchema;
