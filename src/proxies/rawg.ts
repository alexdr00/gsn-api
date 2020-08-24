import axios from 'axios';
import { GameSearchParams } from '../types/interfaces/game';
import { PlatformsByRawgId, StoresByRawgId } from '../types/enums/Games';
import { RawgGame } from '../types/interfaces/rawg';

const baseUrl = 'https://api.rawg.io/api';
const userAgent = 'GSN-API';

class Rawg {
  public async searchGame(gameSearchParams: GameSearchParams): Promise<RawgGame[]> {
    const { searchQuery, resultsPerPage, platformRawgId } = gameSearchParams;

    let filterByStoreQuery = '';
    if (platformRawgId === PlatformsByRawgId.Pc) {
      filterByStoreQuery = `&stores=${StoresByRawgId.Steam}`;
    }

    const url = `${baseUrl}/games?search=${searchQuery}&page_size=${resultsPerPage}&platforms=${platformRawgId}${filterByStoreQuery}`;
    const searchResults = await axios.get(url, { headers: { 'User-Agent': userAgent } });
    return searchResults.data;
  }
}

export default new Rawg();
