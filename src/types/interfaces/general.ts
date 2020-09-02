export interface InsertedRow {
  id: number
}

export interface FilterParameters {
  searchQuery?: string
  page: number
  limit: number
  sortBy: 'ASC' | 'DESC'
}
