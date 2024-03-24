import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';

import {
  getExceptionError,
  getExceptionErrorMessage,
} from './http-exception.utils';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger;

  constructor(private readonly httpAdapterHost: AbstractHttpAdapter) {
    this.logger = new Logger(HttpExceptionFilter.name);
  }

  catch(exception: HttpException | any, host: ArgumentsHost): void {
    const httpAdapter = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorMessage = getExceptionErrorMessage(exception);

    const responseBody = {
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      statusCode: httpStatus,
      error: getExceptionError(exception),
      message: errorMessage,
      timestamp: new Date().toISOString(),
    };

    this.logger.error(
      `HTTP Status: ${httpStatus}, Error Message: ${errorMessage}`,
      exception.stack,
    );

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
