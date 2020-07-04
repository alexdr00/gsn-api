class ValidationError {
  static makeError(error: any) {
    const VALIDATION_ERROR_STATUS_CODE = 400;

    return { statusCode: VALIDATION_ERROR_STATUS_CODE, message: 'Placeholder validation error' };
  }
}


export default ValidationError;
