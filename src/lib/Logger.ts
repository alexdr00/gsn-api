import chalk from 'chalk';
import { ErrorObject } from 'serialize-error';
import Envs from '../types/enums/envs';
import CloudWatch from './aws/CloudWatch';

const { ENVIRONMENT } = process.env;

const cloudWatch = new CloudWatch();

class Logger {
  public static info<T>(infoToLog: T): void {
    console.log('should log');
    cloudWatch.sendLog(infoToLog);
    // const log = JSON.stringify(infoToLog);
    // const colorize = Logger.colorizeByLevel('info');
    // Logger.log(colorize(log));
  }

  public static warning<T>(infoToLog: T): void {
    const log = JSON.stringify(infoToLog);
    const colorize = Logger.colorizeByLevel('warning');
    Logger.log(colorize(log));
  }

  public static error(errorToLog: ErrorObject): void {
    console.log('should log error');
    cloudWatch.sendLogError(errorToLog);
  }

  public static success<T>(infoToLog: T): void {
    const log = JSON.stringify(infoToLog);
    const colorize = Logger.colorizeByLevel('success');
    Logger.log(colorize(log));
  }

  private static log<T>(infoToLog: T): void {
    console.log(infoToLog);
  }

  private static colorizeByLevel(level: 'error' | 'warning' | 'success' | 'info'): <T>(infoToColorize: T) => T {
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
