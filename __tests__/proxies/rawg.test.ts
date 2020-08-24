import rawg from 'proxies/rawg';
import random from 'random';
import axios from 'axios';
import { mocked } from 'ts-jest/utils';
import url from 'url';
import { PlatformsByRawgId, StoresByRawgId } from '../../src/types/enums/Games';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('RAWG Proxy', () => {
  const context: Record<string, any> = {};

  beforeEach(() => {
    context.resultsPerPage = random.int(1, 25);
    context.searchQuery = 'test search';
    context.platformRawgId = PlatformsByRawgId.PlayStation4;
    context.rawgSearchParams = {
      resultsPerPage: context.resultsPerPage,
      searchQuery: context.searchQuery,
      platformRawgId: context.platformRawgId,
    };
  });

  describe('searchGame', () => {
    it('Makes a call to the RAWG API to search games based on the provided params', async () => {
      const mockResult = { data: [] };
      mocked(axios.get).mockResolvedValue(mockResult);
      await rawg.searchGame(context.rawgSearchParams);

      const callParams = mocked(axios.get).mock.calls[0];
      const urlHit = callParams[0];
      const queryObject = url.parse(urlHit, true).query;

      expect(queryObject.search).toBe(context.searchQuery);
      expect(Number(queryObject.page_size)).toBe(context.resultsPerPage);
      expect(Number(queryObject.platforms)).toBe(context.platformRawgId);
    });

    it('Filters also by store if the specified platform is PC', async () => {
      const mockResult = { data: [] };
      mocked(axios.get).mockResolvedValue(mockResult);
      context.rawgSearchParams.platformRawgId = PlatformsByRawgId.Pc;
      await rawg.searchGame(context.rawgSearchParams);

      const callParams = mocked(axios.get).mock.calls[0];
      const urlHit = callParams[0];
      const queryObject = url.parse(urlHit, true).query;

      expect(Number(queryObject.platforms)).toBe(PlatformsByRawgId.Pc);
      expect(Number(queryObject.stores)).toBe(StoresByRawgId.Steam);
    });
  });
});
