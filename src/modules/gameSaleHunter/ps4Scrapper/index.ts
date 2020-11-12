import scrapePsnStoreSearchResults from './steps/scrapePsnStoreSearchResults';
import getGameFromResultsBestMatch from './steps/getGameFromResultsBestMatch';
import {
  GamePrice,
  ScrappedPsnStoreSearchResult,
  ScrapperParams,
} from '../../../types/interfaces/gameSaleHunter';
import getRelevantDataFromScrape from './steps/getRelevantDataFromScrape';

class Ps4Scrapper {
  public static async scrapeGamePrice(scrapperParams: ScrapperParams): Promise<GamePrice | {}> {
    const { country, game } = scrapperParams;
    const { language, iso } = country;
    const scrapeBaseUrl = 'https://store.playstation.com';
    const isoLang = `${language}-${iso.toLowerCase()}`;
    const searchResultsUrl = `${scrapeBaseUrl}/${isoLang}/search/${game.name}`;

    const scrapeSearchResults: ScrappedPsnStoreSearchResult[] = await scrapePsnStoreSearchResults(searchResultsUrl);
    const searchResults: GamePrice[] = getRelevantDataFromScrape(scrapeSearchResults);
    const gamePrice: GamePrice | {} = getGameFromResultsBestMatch(game.name, searchResults);

    return gamePrice;
  }
}

export default Ps4Scrapper;
