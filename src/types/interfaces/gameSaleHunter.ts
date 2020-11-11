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

export interface ScrappedPsnStoreSearchResult {
  name: string | null | undefined,
  price: string | null | undefined,
  platform: string | null | undefined,
  strikedPrice: string | null | undefined,
}

export interface PsnStoreSearchResult {
  name: string,
  price: string,
  platform: string,
  strikedPrice: string | null | undefined,
}
