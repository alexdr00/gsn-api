import Joi from 'proxies/joi';
import errorHandler from 'middleware/errorHander';
import httpMock from 'node-mocks-http';
import HttpStatuses from 'types/enums/HttpStatuses';
import ResponseErrors from 'constants/errors/responses';

jest.mock('lib/Logger');

describe('ErrorHandler Middleware', () => {
  const context: Record<string, any> = {};

  const mockHttp = () => {
    context.req = httpMock.createMocks().req;
    context.res = httpMock.createMocks().res;
    context.next = jest.fn().mockImplementation((err) => { throw err; });
  };

  beforeEach(() => {
    mockHttp();
  });

  it('Handles internal errors', () => {
    const internalError = new Error('Unexpected error!');
    errorHandler(internalError, context.req, context.res, jest.fn());
    expect(context.res.statusCode).toBe(HttpStatuses.InternalError);
    expect(context.res._getJSONData()).toStrictEqual({
      error: {
        title: ResponseErrors.InternalError.name,
        detail: ResponseErrors.InternalError.message,
      },
    });
  });

  it('Handles joi validation errors', () => {
    expect.hasAssertions();
    const schema = Joi.object({ field: Joi.required() });
    const { error } = schema.validate({ field: undefined });
    if (!error) {
      return;
    }

    const NUMBER_OF_EXPECTED_VALIDATIONS = 1;
    errorHandler(error, context.req, context.res, jest.fn());
    const response = context.res._getJSONData();

    expect(context.res.statusCode).toBe(HttpStatuses.BadRequest);
    expect(response.error.details).toHaveLength(NUMBER_OF_EXPECTED_VALIDATIONS);
  });
});
