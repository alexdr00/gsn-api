import CloudWatch from 'lib/aws/CloudWatch';
import { v4 } from 'uuid';
import { mocked } from 'ts-jest/utils';
import extractErrorStackFromLog from 'helpers/extractErrorStack';
import { serializeError } from 'serialize-error';

const putLogEvents = jest.fn();
const createLogStream = jest.fn().mockImplementation((params, callback) => callback(null, {}));

jest.mock('aws-sdk/clients/cloudwatchlogs');
jest.mock('aws-sdk', () => ({
  CloudWatchLogs: jest.fn(() => ({
    putLogEvents,
    createLogStream,
  })),
}));
jest.mock('uuid');
jest.mock('helpers/extractErrorStack');

describe('lib/aws/CloudWatch', () => {
  const context: Record<string, any> = {};

  describe('Given sendLog it:', () => {
    beforeEach(() => {
      context.uuid = 'uuid-generated';
      context.now = Date.now();
      context.logMessage = 'log here';
    });

    const sendLog = async () => {
      const { uuid, now, logMessage } = context;
      global.Date.now = jest.fn().mockReturnValue(now);
      mocked(v4).mockReturnValue(uuid);

      const cloudWatch = new CloudWatch();
      await cloudWatch.sendLog(logMessage);
    };

    it('Generates log stream name that should be a uuid plus the current timestamp', async () => {
      await sendLog();
      const callParams = putLogEvents.mock.calls[0][0];
      const { logStreamName } = callParams;
      expect(logStreamName).toEqual(`${context.now}-${context.uuid}`);
    });

    it('Sends the correct log', async () => {
      await sendLog();
      const callParams = putLogEvents.mock.calls[0][0];
      const { logEvents } = callParams;
      expect(logEvents.message).toEqual(context.logMesssage);
    });

    it('Sends a timestamp', async () => {
      await sendLog();
      const callParams = putLogEvents.mock.calls[0][0];
      const { logEvents } = callParams;
      expect(typeof logEvents[0].timestamp).toEqual('number');
    });
  });

  describe('Given sendLogError it:', () => {
    beforeEach(() => {
      const error = new Error('Testing Error!!');
      context.uuid = 'uuid-generated';
      context.now = Date.now();
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

      const cloudWatch = new CloudWatch();
      await cloudWatch.sendLogError(errorLogMessage);
    };

    it('Generates log stream name that should be a uuid plus the current timestamp', async () => {
      await sendLogError();
      const callParams = putLogEvents.mock.calls[0][0];
      const { logStreamName } = callParams;
      expect(logStreamName).toEqual(`${context.now}-${context.uuid}`);
    });

    it('Sends the error stack in a different log event', async () => {
      const { error, stack } = context;

      await sendLogError();
      const callParams = putLogEvents.mock.calls[0][0];
      const { logEvents } = callParams;
      expect(logEvents[0].message).toEqual(JSON.stringify(error));
      expect(logEvents[1].message).toEqual(stack);
    });

    it('Sends a timestamp', async () => {
      await sendLogError();
      const callParams = putLogEvents.mock.calls[0][0];
      const { logEvents } = callParams;
      expect(typeof logEvents[0].timestamp).toEqual('number');
      expect(typeof logEvents[1].timestamp).toEqual('number');
    });
  });
});
