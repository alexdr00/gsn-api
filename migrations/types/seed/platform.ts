import pg from '../../../src/proxies/db/pg';

class PlatformSeeds {
  static async run() {
    const platforms = [
      {
        rawgId: 4,
        name: 'PC',
        slug: 'pc',
      },
      {
        rawgId: 1,
        name: 'Xbox One',
        slug: 'xbox-one',
      },
      {
        rawgId: 18,
        name: 'PlayStation 4',
        slug: 'playstation4',
      },
    ];

    const seeds = platforms.map((platform) => {
      const {
        name, rawgId, slug,
      } = platform;

      const query = `
        INSERT INTO platform(name, rawg_id, slug) VALUES ($1, $2, $3);
      `;

      return pg.query(query, [name, rawgId, slug], { queryId: 'Migration.PlatformSeeds' });
    });

    await Promise.all(seeds);
  }
}

export default PlatformSeeds;
