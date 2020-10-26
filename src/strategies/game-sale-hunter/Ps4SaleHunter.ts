import { ScrapperParams } from '../../types/interfaces/gameSaleHunter';
import Ps4Scrapper from '../../modules/gameSaleHunter/scrappers/ps4/ps4Scrapper';

class Ps4SaleHunter {
  public static async run(scrapperParams: ScrapperParams) {
    const { country, game } = scrapperParams;
    const { language, iso } = country;
    const scrapeBaseUrl = 'https://www.playstation.com';
    const isoLang = `${language}-${iso.toLowerCase()}`;
    const searchResultsUrl = `${scrapeBaseUrl}/${isoLang}/search?q=${game.name}`;

    await Ps4Scrapper.scrapePrices(game.name, searchResultsUrl);
  }
}

export default Ps4SaleHunter;
