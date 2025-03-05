import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Prevent duplicate responses
    if (response.headersSent) {
      return;
    }

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message =
      exception?.message || 'An unexpected error occurred on the server.';
    let error = exception?.name || 'Internal Server Error';

    if (
      exception instanceof HttpException &&
      status === HttpStatus.BAD_REQUEST
    ) {
      const exceptionResponse = exception.getResponse();
      if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        'message' in exceptionResponse
      ) {
        const responseMessage = exceptionResponse['message'];
        message = Array.isArray(responseMessage)
          ? responseMessage[0]
          : responseMessage;
      }
    }

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `HTTP Status: ${status}, Message: ${message}`,
        exception?.stack || 'No stack trace available',
      );
    }

    response.status(status).json({
      path: request.url,
      status: false,
      statusCode: status,
      message,
      error,
    });
  }
}
