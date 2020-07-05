import HttpStatuses from '../enums/HttpStatuses';

export interface ApiMessage {
  body: string,
  title?: string,
}

export interface ErrorResponse {
  statusCode: HttpStatuses,
  error: {
    messages: ApiMessage[]
  }
}
