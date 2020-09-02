import HttpStatuses from '../enums/HttpStatuses';

export interface ApiMessage {
  title?: string,
  code?: string,
  detail: string,
}

export interface ErrorResponse {
  statusCode: HttpStatuses,
  error: ApiMessage
}

export interface ValidationApiMessage {
  details: string[],
}

export interface ValidationErrorResponse {
  statusCode: HttpStatuses,
  error: ValidationApiMessage
}

export interface ResponseSuccess<T> {
  statusCode?: HttpStatuses.Success | HttpStatuses.Created,
  payload?: T,
  message?: ApiMessage
  page?: number,
  total?: number,
  sorted?: string,
  limit?: number
}
