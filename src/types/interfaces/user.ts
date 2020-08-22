export interface NewUserData {
  email: string,
  name: string,
}

export interface User {
  email: string,
  name: string,
  id: number
}

export interface UserPreferences {
  preferredMaxGameCost?: number,
  countryId?: number,
  preferredPlatformId?: number,
  hasNotificationsTurnedOn?: boolean
}
