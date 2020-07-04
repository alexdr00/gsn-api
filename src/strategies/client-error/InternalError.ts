class InternalError {
  static makeError() {
    const INTERNAL_ERROR_STATUS_CODE = 500;


    return { message: 'Sorry, internal error, we are working on it', statusCode: INTERNAL_ERROR_STATUS_CODE };
  }
}

export default InternalError;
