import { ScrapperParams } from '../../types/interfaces/gameSaleHunter';
import Ps4Scrapper from '../../modules/gameSaleHunter/scrappers/ps4/ps4Scrapper';

class Ps4SaleHunter {
  public static async run(scrapperParams: ScrapperParams) {
    await Ps4Scrapper.scrapePrices(scrapperParams);
  }
}

export default Ps4SaleHunter;
