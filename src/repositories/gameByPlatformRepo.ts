import pg from '../proxies/db/pg';

class GameByPlatformRepo {
  public async insertPlatformByGame(gameId: number, platformId: number): Promise<void> {
    const query = `
      INSERT INTO game_by_platform(game_id, platform_id) VALUES ($1, $2);
    `;

    const parameters = [gameId, platformId];
    await pg.query(query, parameters, { queryId: 'GameByPlatformRepo.insertPlatformByGame' });
  }
}

export default new GameByPlatformRepo();
