export interface GameSearchQueryParams {
  searchQuery: string,
  resultsPerPage: number,
}

export interface GameSearchParams {
  searchQuery: string,
  resultsPerPage: number,
  platformRawgId: number
}

export interface Game {
  id: number
  name: string
  rawgId: number
  pictureUrl: string
}

export interface GameWithPrice extends Game {
  priceWithSale: string | null,
  price: string | null,
  priceLastCheckedOn: string | null,
}

export interface GetFollowedGamesByUserResult extends GameWithPrice {
  total: string
}
