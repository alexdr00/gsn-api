import verror from '../proxies/verror';
import StepErrors from '../constants/errors/steps';
import { RawgPlatform } from '../types/interfaces/rawg';
import { PlatformsByRawgId } from '../types/enums/Games';
import pg from '../proxies/db/pg';
import platformRepo from '../repositories/platformRepo';
import gameByPlatformRepo from '../repositories/gameByPlatformRepo';

async function insertPlatformsByGame(gameId: number, rawgGamePlatforms: { platform: RawgPlatform }[]): Promise<void> {
  try {
    const supportedPlatforms = filterUnsupportedPlatforms();
    const insertionPromises = supportedPlatforms.map(async ({ platform: rawgPlatform }) => {
      const platform = await platformRepo.getPlatformByRawgPlatformId(rawgPlatform.id);
      await gameByPlatformRepo.insertPlatformByGame(gameId, platform.id);
    });

    await pg.query('BEGIN', [], { queryId: 'insertPlatformsByGame.Begin' });
    await Promise.all(insertionPromises);
    await pg.query('COMMIT', [], { queryId: 'insertPlatformsByGame.Commit' });
  } catch (error) {
    await pg.query('ROLLBACK', [], { queryId: 'insertPlatformsByGame.Rollback' });
    throw verror.createError({
      name: StepErrors.InsertPlatformsByGame.name,
      message: StepErrors.InsertPlatformsByGame.message,
      cause: error,
      debugParams: { gameId, rawgGamePlatforms },
    });
  }

  function filterUnsupportedPlatforms(): { platform: RawgPlatform }[] {
    return rawgGamePlatforms.filter(({ platform }) => {
      const supportedRawgPlatformIds = Object.keys(PlatformsByRawgId);
      const platformId = platform.id.toString();
      return supportedRawgPlatformIds.includes(platformId);
    });
  }
}


export default insertPlatformsByGame;
