import { ErrorObject } from 'serialize-error';

export type Level = 'error' | 'warning' | 'success' | 'info';

export interface Log<T> {
  body: T | Error,
  level: Level,
  detail?: string,
  debugParams?: object
}

export interface LogExtended<T> extends Log<T> {
  date: string // format: YYYY/MM/DD HH:MM:SS (Timezone GMT)
  awsRegion: string | undefined,
  environment: string | undefined,
  appName: string | undefined,
  serviceName: string | undefined,
  timestamp: number,
  hostname: string,
}
