import { GamePrice, ScrapperParams } from '../../types/interfaces/gameSaleHunter';
import Ps4Scrapper from '../../modules/gameSaleHunter/ps4Scrapper';

class Ps4SaleHunter {
  public static async run(scrapperParams: ScrapperParams): Promise<GamePrice | {}> {
    const gamePrice: GamePrice | {} = await Ps4Scrapper.scrapeGamePrice(scrapperParams);

    return gamePrice;
  }
}

export default Ps4SaleHunter;
