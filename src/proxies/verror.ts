const VErrorOriginal = require('verror');

type DebugParams = Record<string, any>;

interface CustomError {
  name: string,
  message: string,
  debugParams?: DebugParams
  cause?: Error,
  info?: Record<string, any>,
  code?: string,
}

class VError {
  public createError(error: CustomError): typeof VErrorOriginal {
    const newError = new VErrorOriginal(error, error.message);

    if (error.debugParams) {
      const stackWithDebugParams = this.appendDebugParamsToStack(error.debugParams, newError.stack);
      newError.debugParams = error.debugParams;
      newError.stack = stackWithDebugParams;
    }

    newError.code = error.code;
    newError.message = error.message;

    delete newError.jse_shortmsg;
    delete newError.jse_info;

    return newError;
  }

  public getFullStack(verror: typeof VErrorOriginal): string {
    return VErrorOriginal.fullStack(verror);
  }

  public getOriginCause(verror: typeof VErrorOriginal): any {
    const errorEntries = Object.entries(verror);
    const nextCauseEntry = errorEntries.find((errorEntry) => errorEntry[0] === 'jse_cause');

    if (nextCauseEntry) {
      const nextCauseError = nextCauseEntry[1];
      return this.getOriginCause(nextCauseError);
    }

    return verror;
  }

  private appendDebugParamsToStack(debugParams: DebugParams, stack: string) {
    const debugParamsString = JSON.stringify({ debugParams }, null, 2);
    return `${stack}\n${debugParamsString}`;
  }
}

export default new VError();
