import AWS from 'aws-sdk';
import { InputLogEvents } from 'aws-sdk/clients/cloudwatchlogs';
import { v4 as uuidv4 } from 'uuid';
import { ErrorObject } from 'serialize-error';
import BaseAWSConfig from './BaseAWSConfig';
import { Log } from '../../types/interfaces/Log';
import extractErrorStackFromLog from '../../helpers/extractErrorStack';

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
