import AWS from 'aws-sdk';
import { InputLogEvents } from 'aws-sdk/clients/cloudwatchlogs';
import BaseAWSConfig from './BaseAWSConfig';
import verror from '../verror';

const { AWS_LOG_GROUP } = process.env;

class CloudWatchLogs extends BaseAWSConfig {
  private cloudWatchLogs: AWS.CloudWatchLogs;

  constructor() {
    super();
    const cloudWatchLogsConfig = {
      apiVersion: '2014-03-28',
    };
    this.cloudWatchLogs = new AWS.CloudWatchLogs({ ...this.baseAWSConfig, ...cloudWatchLogsConfig });
  }

  public async createLogStream(streamName: string): Promise<{}> {
    const params = {
      logGroupName: AWS_LOG_GROUP as string,
      logStreamName: streamName,
    };

    return new Promise((resolve, reject) => {
      this.cloudWatchLogs.createLogStream(params, (err, data) => {
        if (err) {
          return reject(verror.createError(err));
        }

        resolve(data);
      });
    });
  }

  public putLogEvents(logEvents: InputLogEvents, streamName: string) {
    const params = {
      logEvents,
      logGroupName: AWS_LOG_GROUP as string,
      logStreamName: streamName,
    };

    return new Promise((resolve, reject) => {
      this.cloudWatchLogs.putLogEvents(params, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

export default new CloudWatchLogs();
