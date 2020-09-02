import pg from '../proxies/db/pg';
import { Game, GetFollowedGamesByUserResult } from '../types/interfaces/game';
import { RawgGame } from '../types/interfaces/rawg';
import { FilterParameters, InsertedRow } from '../types/interfaces/general';

interface GetFollowedGamesByUserData {
  userId: number,
  preferredPlatformId: number,
}

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

  public async getFollowedGamesByUser(filterParams: FilterParameters, userData: GetFollowedGamesByUserData)
    : Promise<GetFollowedGamesByUserResult[]> {
    const {
      sortBy, limit, page, searchQuery,
    } = filterParams;
    const { preferredPlatformId } = userData;

    const query = `
      SELECT 
        game.id,
        game.name,
        game.picture_url AS "pictureUrl",
        game.rawg_id AS "rawgId",
        ph.price,
        ph.price_with_sale AS "priceWithSale",
        ph.timestamp AS "priceLastCheckedOn",
        count(*) OVER() AS total
      FROM game
        INNER JOIN game_by_platform gbp ON game.id = gbp.game_id
        LEFT JOIN (
          select distinct on (ph.game_id) *
          from price_history ph
          order by ph.game_id, ph.timestamp desc 
        ) ph ON game.id = ph.game_id
      WHERE gbp.platform_id = $1
        AND LOWER(game.name) LIKE COALESCE(LOWER($2), LOWER(game.name))
      ORDER BY game.name ${sortBy}
      LIMIT $3
      OFFSET $4
    `;

    const offset = limit * (page - 1);
    const searchQueryFormatted = searchQuery ? `${searchQuery}%` : null;
    const parameters = [preferredPlatformId, searchQueryFormatted, limit, offset];
    const result = await pg.query<GetFollowedGamesByUserResult>(query, parameters, { queryId: 'GameRepo.getFollowedGamesByUser' });
    return result;
  }
}

export default new GameRepo();
