import extractErrorStackFromLog from 'helpers/extractErrorStack';
import { ErrorObject, serializeError } from 'serialize-error';
import { Log } from 'types/interfaces/Log';

describe('helper/extractErrorStackFromLog', () => {
  it('Deletes stack from log object and returns the stack and the error without that stack in different properties', () => {
    const errorMessage = 'Error from test';
    const error = new Error(errorMessage);
    const errorSerialized = serializeError(error);
    const log: Log<ErrorObject> = {
      body: errorSerialized,
      level: 'info',
    };
    const { logWithoutStack, stack } = extractErrorStackFromLog(log);

    expect(logWithoutStack.body.stack).toBeUndefined();
    expect(stack).toContain(errorMessage);
  });
});
