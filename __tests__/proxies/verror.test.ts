import verror from 'proxies/verror';

describe('VError Proxy', () => {
  describe('createError', () => {
    it('Creates a descriptive error', () => {
      const errorMessage = 'Error Test';
      const newError = Error(errorMessage);
      const error = verror.createError(newError);

      expect(error.name).toBe('VError');
      expect(error.message).toBe(errorMessage);
      expect(error.jse_cause).toBe(newError);
      expect(error).not.toHaveProperty('debugParams');
    });

    it('Appends debug params to error object', () => {
      const newError = { name: 'Name', message: 'Message', debugParams: { param1: 'value1', param2: 'value2' } };
      const error = verror.createError(newError);

      expect(error.debugParams).toBe(newError.debugParams);
    });

    it('Appends debug params to stack', () => {
      const newError = { name: 'Name', message: 'Message', debugParams: { param1: 'value1', param2: 'value2' } };
      const error = verror.createError(newError);

      const debugParamsString = JSON.stringify({ debugParams: newError.debugParams }, null, 2);
      expect(error.stack).toContain(debugParamsString);
    });
  });

  describe('getOriginCause', () => {
    it('It gets the origin cause from a series of chained errors', () => {
      const firstError = new Error('First Error');
      const secondError = new Error('Second error');
      const thirdError = new Error('Third error');

      const origin = verror.createError({ name: firstError.name, message: firstError.message, cause: firstError });
      const second = verror.createError({ name: secondError.name, message: secondError.message, cause: origin });
      const third = verror.createError({ name: thirdError.name, message: thirdError.message, cause: second });

      const originCause = verror.getOriginCause(third);
      expect(originCause).toBe(firstError);
    });
  });
});
