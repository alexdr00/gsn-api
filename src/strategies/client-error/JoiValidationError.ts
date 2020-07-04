class JoiValidationError {
  static makeError(error: any) {
    const VALIDATION_ERROR_STATUS_CODE = 400;
  
    const validationMessages = error.details.map((detail: any) => detail.message);
    return { statusCode: VALIDATION_ERROR_STATUS_CODE, message: validationMessages };
  }
}


export default JoiValidationError;
