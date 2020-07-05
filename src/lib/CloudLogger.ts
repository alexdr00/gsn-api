import { InputLogEvents } from 'aws-sdk/clients/cloudwatchlogs';
import { v4 as uuidv4 } from 'uuid';
import BaseAWSConfig from '../proxies/aws/BaseAWSConfig';
import { Log } from '../types/interfaces/log';
import cloudWatchLogs from '../proxies/aws/cloudWatchLogs';
import verror from '../proxies/verror';

class CloudLogger extends BaseAWSConfig {
  public static async sendLogError(log: Log<Error>): Promise<void> {
    const now = Date.now();
    const streamName = `${now}-${uuidv4()}`;

    await cloudWatchLogs.createLogStream(streamName);

    const logEvents: InputLogEvents = [
      {
        timestamp: new Date().getTime(),
        message: JSON.stringify(log),
      },
      {
        timestamp: new Date().getTime(),
        message: verror.getFullStack(log.body),
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
