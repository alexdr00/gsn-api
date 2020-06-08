import AWS from 'aws-sdk';
import { InputLogEvent, InputLogEvents } from 'aws-sdk/clients/cloudwatchlogs';
import { v4 as uuidv4 } from 'uuid';
import { ErrorObject } from 'serialize-error';
import BaseAWSConfig from './BaseAWSConfig';

const { AWS_LOG_GROUP } = process.env;

class CloudWatch extends BaseAWSConfig {
  private cloudWatchLogs: AWS.CloudWatchLogs;

  constructor() {
    super();
    this.cloudWatchLogs = new AWS.CloudWatchLogs(this.baseConfig);
  }

  public async sendLogError(error: ErrorObject): Promise<void> {
    const now = Date.now();
    const streamName = `${now}-${uuidv4()}`;

    await this.createLogStream(streamName);

    const logEvents = this.createErrorLogEvents(error);
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

  private createErrorLogEvents = (error: ErrorObject): InputLogEvents => {
    const timestamp = new Date().getTime();

    const errorProperties = Object.entries(error);
    return errorProperties.map((errorProperty): InputLogEvent => {
      const [errorPropertyName, errorPropertyValue] = errorProperty;

      return {
        timestamp,
        message: `${errorPropertyName}: ${errorPropertyValue}`,
      };
    });
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
