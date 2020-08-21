import pg from '../../../src/proxies/db/pg';

class UserSchema {
  static async run() {
    const query = `
      CREATE TABLE IF NOT EXISTS "user" (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        preferred_max_game_cost BIGINT,
        country_id INT,
        has_notifications_turned_on BOOLEAN DEFAULT FALSE, 
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        
        CONSTRAINT fk_country
          FOREIGN KEY (country_id)
          REFERENCES country(id)
          ON DELETE SET DEFAULT                   
      );
    `;

    const appendTriggerQuery = `
      CREATE TRIGGER set_current_timestamp_on_update
      BEFORE UPDATE ON "user"
      FOR EACH ROW
      EXECUTE PROCEDURE set_updated_at_to_current_timestamp();
    `;

    await pg.query(query, [], { queryId: 'Migration.UserSchema' });
    await pg.query(appendTriggerQuery, [], { queryId: 'Migration.UserAppendTrigger' });
  }
}

export default UserSchema;
