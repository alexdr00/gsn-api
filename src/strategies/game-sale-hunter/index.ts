import { PlatformSlugs } from '../../types/enums/Platforms';
import Ps4SaleHunter from './Ps4SaleHunter';
import { Platform } from '../../types/interfaces/platform';

class GameSaleHunter {
  public static getScrapperMethodBasedOnPlatform(platform: Platform) {
    const scrappersByPlatformSlug: any = {
      [PlatformSlugs.ps4]: Ps4SaleHunter,
    };

    return scrappersByPlatformSlug[platform.slug];
  }
}

export default GameSaleHunter;
