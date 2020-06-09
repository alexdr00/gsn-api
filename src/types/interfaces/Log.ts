import { ErrorObject } from 'serialize-error';

export type Level = 'error' | 'warning' | 'success' | 'info';

export interface Log<T> {
  body: T | ErrorObject,
  level: Level,
  date?: string // format: YYYY/MM/DD HH:MM:SS
}
