import HttpStatuses from '../enums/HttpStatuses';

export interface ApiMessage {
  title?: string,
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
