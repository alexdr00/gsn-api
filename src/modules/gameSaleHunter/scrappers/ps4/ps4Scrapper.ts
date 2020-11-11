import scrapePsnStoreSearchResults from './steps/scrapePsnStoreSearchResults';
import getBestNameMatchFromResults from './steps/getBestNameMatchFromResults';
import {
  PsnStoreSearchResult,
  ScrappedPsnStoreSearchResult,
  ScrapperParams,
} from '../../../../types/interfaces/gameSaleHunter';
import getRelevantDataFromScrape from './steps/getRelevantDataFromScrape';

class Ps4Scrapper {
  public static async scrapePrices(scrapperParams: ScrapperParams) {
    const { country, game } = scrapperParams;
    const { language, iso } = country;
    const scrapeBaseUrl = 'https://store.playstation.com';
    const isoLang = `${language}-${iso.toLowerCase()}`;
    const searchResultsUrl = `${scrapeBaseUrl}/${isoLang}/search/${game.name}`;
    const scrapeSearchResults: ScrappedPsnStoreSearchResult[] = await scrapePsnStoreSearchResults(searchResultsUrl);
    const searchResults: PsnStoreSearchResult[] = getRelevantDataFromScrape(scrapeSearchResults);
    const gameWithPrices: PsnStoreSearchResult | {} = getBestNameMatchFromResults(game.name, searchResults);
    console.log({ gameWithPrices });
  }
}

export default Ps4Scrapper;
