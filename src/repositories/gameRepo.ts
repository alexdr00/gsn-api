import pg from '../proxies/db/pg';
import { Game } from '../types/interfaces/game';
import { RawgGame } from '../types/interfaces/rawg';
import { InsertedRow } from '../types/interfaces/general';

class GameRepo {
  public async getGameByRawgId(rawgId: number): Promise<Game | undefined> {
    const query = `
      SELECT 
        id,
        rawg_id AS rawgId,
        name,
        picture_url AS pictureUrl
      FROM game
      WHERE rawg_id = $1;
    `;

    const parameters = [rawgId];
    const [game] = await pg.query<Game | undefined>(query, parameters, { queryId: 'GameRepo.getGameByRawgId' });
    return game;
  }

  public async insertGame(rawgGame: RawgGame): Promise<number> {
    const { name, id, background_image: backgroundImage } = rawgGame;

    const query = `
      INSERT INTO game (name, rawg_id, picture_url) VALUES ($1, $2, $3)
      RETURNING id;
    `;

    const parameters = [name, id, backgroundImage];
    const [insertedGame] = await pg.query<InsertedRow>(query, parameters, { queryId: 'GameRepo.insertGame' });
    return insertedGame.id;
  }

  public async followGame(userId: number, gameId: number): Promise<void> {
    const query = `
      INSERT INTO followed_game (game_id, user_id) VALUES ($1, $2);
    `;

    const parameters = [gameId, userId];
    await pg.query(query, parameters, { queryId: 'GameRepo.followGame' });
  }

  public async getFollowedGameByUser(gameId: number, userId: number): Promise<{ id: number } | undefined> {
    const query = `
      SELECT 
        id
      FROM followed_game
      WHERE game_id = $1 AND user_id = $2;
    `;

    const parameters = [gameId, userId];
    const [followedGame] = await pg.query<{ id: number } | undefined>(query, parameters, { queryId: 'GameRepo.getFollowedGameByUser' });
    return followedGame;
  }
}

export default new GameRepo();
