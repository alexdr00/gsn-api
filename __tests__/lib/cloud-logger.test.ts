import CloudLogger from 'lib/CloudLogger';
import { v4 } from 'uuid';
import { mocked } from 'ts-jest/utils';
import extractErrorStackFromLog from 'helpers/extractErrorStack';
import { serializeError } from 'serialize-error';
import cloudWatchLogs from 'proxies/aws/cloudWatchLogs';

jest.mock('proxies/aws/cloudWatchLogs');
jest.mock('uuid');
jest.mock('helpers/extractErrorStack');

describe('lib/aws/CloudLogger', () => {
  let context: Record<string, any> = {};

  const setupGlobalContext = () => {
    context.uuid = 'uuid-generated';
    context.now = Date.now();
    context.putLogEvents = jest.fn();
  };

  const mockCloudWatchLogs = () => {
    mocked(cloudWatchLogs).putLogEvents.mockImplementation(context.putLogEvents);
  };

  const cleanup = () => {
    context = {};
  };

  beforeEach(() => {
    setupGlobalContext();
    mockCloudWatchLogs();
  });

  afterEach(() => {
    cleanup();
  });

  describe('Given sendLog it:', () => {
    beforeEach(() => {
      context.logMessage = 'log here';
    });

    const sendLog = async () => {
      const { uuid, now, logMessage } = context;
      global.Date.now = jest.fn().mockReturnValue(now);
      mocked(v4).mockReturnValue(uuid);

      await CloudLogger.sendLog(logMessage);
    };

    it('Generates log stream name that should be a uuid plus the current timestamp', async () => {
      await sendLog();
      const fnArguments = context.putLogEvents.mock.calls[0];
      const streamName = fnArguments[1];
      expect(streamName).toEqual(`${context.now}-${context.uuid}`);
    });

    it('Sends the correct log', async () => {
      await sendLog();
      const fnArguments = context.putLogEvents.mock.calls[0];
      const logEvents = fnArguments[0];
      const { message } = logEvents[0];
      expect(JSON.parse(message)).toEqual(context.logMessage);
    });

    it('Sends a timestamp', async () => {
      await sendLog();
      const fnArguments = context.putLogEvents.mock.calls[0];
      const logEvents = fnArguments[0];
      const { timestamp } = logEvents[0];
      expect(typeof timestamp).toEqual('number');
    });
  });

  describe('Given sendLogError it:', () => {
    beforeEach(() => {
      const error = new Error('Testing Error!!');
      context.error = serializeError(error);
      context.stack = 'test stack';
    });

    const sendLogError = async () => {
      const {
        uuid, now, errorLogMessage, stack, error,
      } = context;
      global.Date.now = jest.fn().mockReturnValue(now);
      mocked(v4).mockReturnValue(uuid);
      mocked(extractErrorStackFromLog).mockReturnValue({ stack, logWithoutStack: error });

      await CloudLogger.sendLogError(errorLogMessage);
    };

    it('Generates log stream name that should be a uuid plus the current timestamp', async () => {
      await sendLogError();
      const fnArguments = context.putLogEvents.mock.calls[0];
      const streamName = fnArguments[1];
      expect(streamName).toEqual(`${context.now}-${context.uuid}`);
    });

    it('Sends the error stack in a different log event', async () => {
      const { error, stack } = context;

      await sendLogError();
      const fnArguments = context.putLogEvents.mock.calls[0];
      const logEvents = fnArguments[0];
      expect(logEvents[0].message).toEqual(JSON.stringify(error));
      expect(logEvents[1].message).toEqual(stack);
    });

    it('Sends a timestamp for each log event', async () => {
      await sendLogError();
      const fnArguments = context.putLogEvents.mock.calls[0];
      const logEvents = fnArguments[0];
      expect(typeof logEvents[0].timestamp).toEqual('number');
      expect(typeof logEvents[1].timestamp).toEqual('number');
    });
  });
});
