export interface RawgPlatform {
  id: number,
  name: string,
  slug: string,
}

export interface RawgStore {
  id: number,
  name: string,
  slug: string,
}

export interface RawgGenre {
  id: number,
  name: string,
  slug: string,
}

export interface RawgRating {
  id: number,
  title: string,
  count: number,
  percent: number,
}

export interface RawgStatusNumber {
  yet: number,
  owned: number,
  beaten: number,
  toplay: number,
  dropped: number,
  playing: number,
}

export interface RawgClip {
  clip: string,
  video: string,
  clips: object,
}

export interface RawgTag {
  id: number,
  name: string,
  slug: string,
  language: string,
  games_count: number,
  image_background: string,
}

export interface Screenshot {
  id: number,
  image: string,
}

export interface RawgGame {
  id: number
  slug: string
  name: string
  released: string
  tba: boolean
  background_image: string
  rating: number
  rating_top: number
  ratings: RawgRating[]
  ratings_count: number
  reviews_text_count: string
  added: number
  added_by_status: RawgStatusNumber
  tags: RawgTag[]
  metacritic: number
  playtime: number
  suggestions_count: number
  esrb_rating: object | null
  stores: { store: RawgStore }[]
  score: number
  short_screenshots: Screenshot[]
  platforms: { platform: RawgPlatform }[]
  parent_platforms: { platform: RawgPlatform }[]
  genres: RawgGenre[]
  clip: RawgClip
}
