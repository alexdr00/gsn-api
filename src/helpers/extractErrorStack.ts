import { ErrorObject } from 'serialize-error';
import { Log } from '../types/interfaces/log';
import { NO_STACK } from '../constants/errors/generic';

const extractErrorStackFromLog = (log: Log<ErrorObject>): { logWithoutStack: Log<ErrorObject>, stack: string } => {
  // We might want to extract the stack from the error because stack doesn't look human-readable with JSON.stringify

  // Clone the log object so we don't cause side effects while deleting the stack property
  const logCopyString = JSON.stringify(log);
  const logCopy = JSON.parse(logCopyString);

  const stack = log.body.stack || NO_STACK;
  delete logCopy.body.stack;

  const logWithoutStack = logCopy;
  return { logWithoutStack, stack };
};

export default extractErrorStackFromLog;
