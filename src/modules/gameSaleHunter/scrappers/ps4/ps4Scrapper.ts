import getPsnStoreSearchResults from './steps/getPsnStoreSearchResults';
import getPsnGameUrlFromSearchResults from './steps/getPsnGameUrlFromSearchResults';
import { PsnStoreSearchResults, ScrapperParams } from '../../../../types/interfaces/gameSaleHunter';
import getGameStoreUrl from './steps/getGameStoreUrl';

class Ps4Scrapper {
  public static async scrapePrices(scrapperParams: ScrapperParams) {
    const { country, game } = scrapperParams;
    const { language, iso } = country;
    const scrapeBaseUrl = 'https://store.playstation.com';
    const isoLang = `${language}-${iso.toLowerCase()}`;
    const searchResultsUrl = `${scrapeBaseUrl}/${isoLang}/search/${game.name}`;

    const searchResults: PsnStoreSearchResults[] = await getPsnStoreSearchResults(searchResultsUrl);
    // const psnGameUrl: string = getPsnGameUrlFromSearchResults(game.name, searchResults);
    // console.log({ psnGameUrl });
    // const gameStoreUrl: string | null = await getGameStoreUrl(psnGameUrl);
    // console.log({ gameStoreUrl });
  }
}

export default Ps4Scrapper;
