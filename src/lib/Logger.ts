import chalk from 'chalk';
import { ErrorObject } from 'serialize-error';
import { format } from 'date-fns';
import Envs from '../types/enums/envs';
import CloudWatch from './aws/CloudWatch';
import { Level, Log } from '../types/interfaces/Log';

const { ENVIRONMENT } = process.env;

const cloudWatch = new CloudWatch();

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

  public static error(errorToLog: ErrorObject): void {
    const err: Log<ErrorObject> = {
      level: 'error',
      body: errorToLog,
    };
    Logger.log(err);
  }

  public static success<T>(infoToLog: T): void {
    const log: Log<T> = {
      level: 'success',
      body: infoToLog,
    };
    Logger.log(log);
  }

  private static log<T>(infoToLog: Log<T>): void {
    const logInfo = { ...infoToLog };
    const { level, body } = infoToLog;
    const colorize = Logger.colorizeByLevel(level);
    const now = new Date();
    //                         YYYY/MM/DD HH:MM:SS
    const dateFormatPattern = 'yyyy/MMM/dd H:mm:ss';
    logInfo.date = format(now, dateFormatPattern);

    if (level === 'error') {
      const { stack, ...errorWithoutStack } = body as ErrorObject;
      errorWithoutStack.level = level;
      console.log(colorize(JSON.stringify(errorWithoutStack, null, 2)));
      console.log(colorize(stack));
    } else {
      console.log(colorize(JSON.stringify(logInfo, null, 2)));
    }

    this.sendLogToCloudWatch(infoToLog);
  }

  private static sendLogToCloudWatch<T>(infoToLog: Log<T>) {
    const envsToSendLogs = [Envs.Development, Envs.Stagging, Envs.Production];
    const currentEnv = ENVIRONMENT as Envs;

    envsToSendLogs.push(Envs.Local); // Leave this just for testing purposes, delete when needed no longer.
    if (!envsToSendLogs.includes(currentEnv)) {
      return;
    }

    if (infoToLog.level === 'error') {
      cloudWatch.sendLogError(infoToLog);
      return;
    }

    cloudWatch.sendLog(infoToLog);
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
