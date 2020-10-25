import { ScrapperParams } from '../../types/interfaces/gameSaleHunter';
import Ps4Scrapper from '../../modules/gameSaleHunter/scrappers/ps4/ps4Scrapper';

class Ps4SaleHunter {
  public static run(scrapperParams: ScrapperParams) {
    const { country, game } = scrapperParams;
    const { language, iso } = country;
    const scrapeBaseUrl = 'https://www.playstation.com';
    const isoLang = `${language}-${iso.toLowerCase()}`;
    const scrapeUrl = `${scrapeBaseUrl}/${isoLang}/search?q=${game.name}`;

    Ps4Scrapper.scrapePrices(scrapeUrl);
  }
}

export default Ps4SaleHunter;
