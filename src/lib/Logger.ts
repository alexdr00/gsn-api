import chalk from 'chalk';
import os from 'os';
import { format } from 'date-fns';
import Envs from '../types/enums/Envs';
import CloudLogger from './CloudLogger';
import { Level, Log, LogExtended } from '../types/interfaces/log';
import verror from '../proxies/verror';

const {
  ENVIRONMENT, AWS_REGION, SERVICE_NAME, APP_NAME,
} = process.env;

const hostname = os.hostname();

class Logger {
  public static info<T>(infoToLog: T): void {
    const log: Log<T> = {
      level: 'info',
      body: infoToLog,
    };
    Logger.log(log);
  }

  public static warning<T>(infoToLog: T): void {
    const log: Log<T> = {
      level: 'warning',
      body: infoToLog,
    };
    Logger.log(log);
  }

  public static error(errorToLog: Error, detail?: string, shouldSendToCloudWatch?: boolean): void {
    const err: Log<Error> = {
      level: 'error',
      body: errorToLog,
      detail,
    };
    Logger.logError(err, shouldSendToCloudWatch);
  }

  public static success<T>(infoToLog: T): void {
    const log: Log<T> = {
      level: 'success',
      body: infoToLog,
    };
    Logger.log(log);
  }

  private static logError(errorLog: Log<Error>, shouldSendToCloudWatch?: boolean): void {
    const colorize = Logger.colorizeByLevel('error');

    const infoErrorExtended: LogExtended<Error> = Logger.extendLog(errorLog);
    console.log(colorize(verror.getFullStack(errorLog.body)));

    if (shouldSendToCloudWatch) {
      this.sendErrorLogToCloudWatch(infoErrorExtended);
    }
  }

  private static log<T>(infoToLog: Log<T>): void {
    const { level } = infoToLog;
    const colorize = Logger.colorizeByLevel(level);

    const infoLogExtended: LogExtended<T> = Logger.extendLog(infoToLog);
    console.log(colorize(infoLogExtended.body));
  }

  private static extendLog<T>(infoToLog: Log<T>): LogExtended<T> {
    const now = new Date();
    // ----------------------  YYYY/MM/DD HH:MM:SS (Timezone GMT)
    const dateFormatPattern = 'yyyy/MMM/dd H:mm:ss (OOOO)';

    // All the info common to each type of log will go here.
    return {
      ...infoToLog,
      hostname,
      date: format(now, dateFormatPattern),
      awsRegion: AWS_REGION,
      serviceName: SERVICE_NAME,
      appName: APP_NAME,
      environment: ENVIRONMENT,
      timestamp: Date.now(),
    };
  }

  private static sendLogToCloudWatch<T>(infoToLog: LogExtended<T>): void {
    const envsToSendLogs = [Envs.Development, Envs.Stagging, Envs.Production];
    const currentEnv = ENVIRONMENT as Envs;

    envsToSendLogs.push(Envs.Local); // Leave this just for testing purposes, delete when no longer needed.
    if (!envsToSendLogs.includes(currentEnv)) {
      return;
    }

    CloudLogger.sendLog(infoToLog);
  }

  private static sendErrorLogToCloudWatch(infoToLog: LogExtended<Error>): void {
    const envsToSendLogs = [Envs.Development, Envs.Stagging, Envs.Production];
    const currentEnv = ENVIRONMENT as Envs;

    envsToSendLogs.push(Envs.Local); // Leave this just for testing purposes, delete when no longer needed.
    if (!envsToSendLogs.includes(currentEnv)) {
      return;
    }

    CloudLogger.sendLogError(infoToLog);
  }

  private static colorizeByLevel(level: Level): <T>(infoToColorize: T) => T {
    const colorByLevel = {
      error: chalk.red,
      warning: chalk.yellow,
      info: chalk.magenta,
      success: chalk.green,
    };

    if (ENVIRONMENT !== Envs.Local) {
      // Do not colorize, return as is.
      return <T>(log: T) => log;
    }

    return colorByLevel[level];
  }
}

export default Logger;
