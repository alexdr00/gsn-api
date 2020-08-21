import pg from '../../../src/proxies/db/pg';

class SetDefaultCountryToUser {
  static async run() {
    const defaultCountryIso = 'US';
    const queryGetDefaultCountry = `
      SELECT id FROM country WHERE iso = $1;
    `;
    const defaultCountryRecord = await pg.query(queryGetDefaultCountry, [defaultCountryIso], { queryId: 'Migration.GetDefaultCountry' });
    const defaultCountryId = defaultCountryRecord[0].id;

    const query = `
      ALTER TABLE "user"
      ALTER COLUMN country_id SET DEFAULT ${defaultCountryId}
    `;
    return pg.query(query, [], { queryId: 'Migration.SetDefaultCountryToUser' });
  }
}

export default SetDefaultCountryToUser;
