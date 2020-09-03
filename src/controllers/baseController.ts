import { Response } from 'express';
import { ResponseSuccess } from '../types/interfaces/apiResponse';
import HttpStatuses from '../types/enums/HttpStatuses';

class BaseController {
  public handleSuccess<T>(res: Response, responseSuccess: ResponseSuccess<T>): void {
    const defaultSuccessStatusCode = HttpStatuses.Success;
    const {
      statusCode = defaultSuccessStatusCode, payload, message, page, sorted, total, limit,
    } = responseSuccess;

    res.status(statusCode).json({
      message,
      payload,
      page,
      sorted,
      total,
      limit,
    });
  }
}

export default new BaseController();
