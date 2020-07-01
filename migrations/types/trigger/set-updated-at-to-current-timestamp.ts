import pg from '../../../src/proxies/db/pg';

class SetUpdatedAtToCurrentTimestamp {
  static async run() {
    const query = `
      CREATE OR REPLACE FUNCTION set_updated_at_to_current_timestamp() RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = CURRENT_TIMESTAMP;
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `;

    await pg.query(query, [], { queryId: 'Trigger.SetUpdatedAtToCurrentTimestamp' });
  }
}

export default SetUpdatedAtToCurrentTimestamp;
