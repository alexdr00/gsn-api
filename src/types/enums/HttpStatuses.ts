enum HttpStatuses {
  Success = 200,
  Created = 201,

  InternalError = 500,
  BadRequest = 400,
  NotFound = 404,
  UnprocessableEntity = 422,
  NotAuthorized = 401
}

export default HttpStatuses;
