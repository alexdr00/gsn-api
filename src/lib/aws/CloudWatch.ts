import AWS from 'aws-sdk';
import { InputLogEvent, InputLogEvents } from 'aws-sdk/clients/cloudwatchlogs';
import { v4 as uuidv4 } from 'uuid';
import { ErrorObject } from 'serialize-error';
import BaseAWSConfig from './BaseAWSConfig';
import { Log } from '../../types/interfaces/Log';

const { AWS_LOG_GROUP } = process.env;

class CloudWatch extends BaseAWSConfig {
  private cloudWatchLogs: AWS.CloudWatchLogs;

  constructor() {
    super();
    this.cloudWatchLogs = new AWS.CloudWatchLogs(this.baseAWSConfig);
  }

  public async sendLogError(log: Log<ErrorObject>): Promise<void> {
    const now = Date.now();
    const streamName = `${now}-${uuidv4()}`;

    await this.createLogStream(streamName);

    const logEvents = this.createErrorLogEvents(log);
    this.createLogEvents(logEvents, streamName);
  }

  public async sendLog<T>(log: T): Promise<void> {
    const now = Date.now();
    const streamName = `${now}-${uuidv4()}`;

    await this.createLogStream(streamName);

    const logEvents = [
      {
        message: JSON.stringify(log),
        timestamp: new Date().getTime(),
      },
    ];
    this.createLogEvents(logEvents, streamName);
  }

  private createErrorLogEvents = (log: Log<ErrorObject>): InputLogEvents => {
    const error: ErrorObject = log.body;
    const errorProperties = Object.entries(error);
    const timestamp = new Date().getTime();
    const logEvents = errorProperties.map((errorProperty): InputLogEvent => {
      const [errorPropertyName, errorPropertyValue] = errorProperty;

      return {
        timestamp,
        message: `${errorPropertyName}: ${errorPropertyValue}`,
      };
    });

    // The next lines add a stringified version of the error.
    // The reason: Even though we already have all the properties in the log one by one
    // per Log Event, it'd be cool to have the stringified version of it at the top so we can see the whole
    // error object at first glance.
    // Also: "stack" property is being deleted since the stack doesn't look good with JSON.stringify
    // This is not a problem since we already have the stack prettified down below the log events.
    const { stack, ...errorWithoutStack } = error;
    errorWithoutStack.level = log.level;
    logEvents.unshift({
      timestamp,
      message: JSON.stringify(errorWithoutStack),
    });
    return logEvents;
  };

  private createLogEvents(logEvents: InputLogEvents, streamName: string) {
    const params = {
      logEvents,
      logGroupName: AWS_LOG_GROUP as string,
      logStreamName: streamName,
    };

    this.cloudWatchLogs.putLogEvents(params, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  private async createLogStream(streamName: string): Promise<{}> {
    const params = {
      logGroupName: AWS_LOG_GROUP as string,
      logStreamName: streamName,
    };

    return new Promise((resolve, reject) => {
      this.cloudWatchLogs.createLogStream(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

export default CloudWatch;
