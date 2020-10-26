import getPsnStoreSearchResults, { PsnStoreSearchResults } from './steps/getPsnStoreSearchResults';
import getPsnGameUrl from './steps/getPsnGameUrl';

class Ps4Scrapper {
  public static async scrapePrices(gameName:string, searchResultsUrl: string) {
    const searchResults: PsnStoreSearchResults[] = await getPsnStoreSearchResults(searchResultsUrl);
    const gameUrl = getPsnGameUrl(gameName, searchResults);
    console.log(gameUrl);
  }
}

export default Ps4Scrapper;
