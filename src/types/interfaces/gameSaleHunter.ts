import { Platform } from './platform';
import { Country } from './country';
import { Game } from './game';

export interface GetGameSaleQueryParams {
  gameId: number,
}

export interface ScrapperParams {
  country: Country,
  game: Game
}

export interface GameSaleHunterOptions {
  game: Game
  platform: Platform
  country: Country
}

export interface GamePrices {
  normalPrice: number | null,
  priceWithSale: number | null,
}
