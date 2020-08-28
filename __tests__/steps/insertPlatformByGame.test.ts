import { mocked } from 'ts-jest/utils';
import random from 'random';
import platformRepo from 'repositories/platformRepo';
import gameByPlatformRepo from 'repositories/gameByPlatformRepo';
import { PlatformsByRawgId } from '../../src/types/enums/Games';
import insertPlatformsByGame from '../../src/steps/insertPlatformByGame';
import StepErrors from '../../src/constants/errors/steps';

jest.mock('repositories/platformRepo');
jest.mock('repositories/gameByPlatformRepo');
jest.mock('proxies/db/pg');

describe('Insert Platform By Game step', () => {
  const context: Record<string, any> = {};

  const setupContext = () => {
    const unsupportedPlatformId = 9999;
    const otherUnsupportedPlatformId = 99999;
    context.gameId = random.int(1, 10);
    context.rawgPlatforms = [
      {
        platform: { id: PlatformsByRawgId.PlayStation4 },
      },
      {
        platform: { id: PlatformsByRawgId.XboxOne },
      },
      {
        platform: { id: unsupportedPlatformId },
      },
      {
        platform: { id: otherUnsupportedPlatformId },
      },
    ];
  };

  beforeEach(() => {
    setupContext();
  });

  it('Inserts the provided platforms to the database as long as they are supported', async () => {
    const platform = { id: random.int(1, 10) };
    // @ts-ignore
    mocked(platformRepo.getPlatformByRawgPlatformId).mockResolvedValue(platform);
    await insertPlatformsByGame(context.gameId, context.rawgPlatforms);

    const firstInsertion = mocked(platformRepo.getPlatformByRawgPlatformId).mock.calls[0][0];
    const secondInsertion = mocked(platformRepo.getPlatformByRawgPlatformId).mock.calls[1][0];

    expect(firstInsertion).toBe(PlatformsByRawgId.PlayStation4);
    expect(secondInsertion).toBe(PlatformsByRawgId.XboxOne);

    expect(gameByPlatformRepo.insertPlatformByGame).toBeCalledTimes(2);
    expect(gameByPlatformRepo.insertPlatformByGame).toHaveBeenCalledWith(context.gameId, platform.id);
  });

  it('Throws a descriptive error if something fails', async () => {
    mocked(platformRepo.getPlatformByRawgPlatformId).mockImplementation(() => { throw new Error('test error'); });

    try {
      await insertPlatformsByGame(context.gameId, context.rawgPlatforms);
    } catch (error) {
      expect(error.name).toBe(StepErrors.InsertPlatformsByGame.name);
      expect(error.message).toBe(StepErrors.InsertPlatformsByGame.message);
    }

    expect.hasAssertions();
  });
});
