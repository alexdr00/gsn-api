import { InputLogEvents } from 'aws-sdk/clients/cloudwatchlogs';
import { v4 as uuidv4 } from 'uuid';
import { ErrorObject } from 'serialize-error';
import BaseAWSConfig from '../proxies/aws/BaseAWSConfig';
import { Log } from '../types/interfaces/Log';
import extractErrorStackFromLog from '../helpers/extractErrorStack';
import cloudWatchLogs from '../proxies/aws/CloudWatchLogs';

class CloudLogger extends BaseAWSConfig {
  public static async sendLogError(log: Log<ErrorObject>): Promise<void> {
    const now = Date.now();
    const streamName = `${now}-${uuidv4()}`;

    await cloudWatchLogs.createLogStream(streamName);

    const { stack, logWithoutStack } = extractErrorStackFromLog(log);
    const logEvents: InputLogEvents = [
      {
        timestamp: new Date().getTime(),
        message: JSON.stringify(logWithoutStack),
      },
      {
        timestamp: new Date().getTime(),
        message: stack,
      },
    ];
    await cloudWatchLogs.putLogEvents(logEvents, streamName);
  }

  public static async sendLog<T>(log: T): Promise<void> {
    const now = Date.now();
    const streamName = `${now}-${uuidv4()}`;

    await cloudWatchLogs.createLogStream(streamName);

    const logEvents = [
      {
        message: JSON.stringify(log),
        timestamp: new Date().getTime(),
      },
    ];
    await cloudWatchLogs.putLogEvents(logEvents, streamName);
  }
}

export default CloudLogger;
