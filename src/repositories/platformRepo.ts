import pg from '../proxies/db/pg';
import { Platform } from '../types/interfaces/platform';

class PlatformRepo {
  public async getPlatformByRawgPlatformId(rawgPlatformId: number): Promise<Platform> {
    const query = `
      SELECT 
        id,  
        rawg_id AS platformRawgId,
        name,
        slug
      FROM platform
      WHERE rawg_id = $1;
    `;

    const parameters = [rawgPlatformId];
    const [platform] = await pg.query<Platform>(query, parameters, { queryId: 'PlatformRepo.insertPlatformByGame' });
    return platform;
  }
}

export default new PlatformRepo();
