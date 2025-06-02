import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Request, Response } from 'express';
import { User } from '@prisma/client';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const { method, originalUrl: path } = request;
    const user = request.user as User;
    const userEmail = user?.email || 'anonymous';

    this.logger.log(`Incoming request ${userEmail} ${method} ${path}`);

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        this.logger.debug(
          `Request served in ${duration}ms ${userEmail} ${method} ${path}`,
        );
      }),
      catchError((err) => {
        const duration = Date.now() - start;
        this.logger.error(
          `Request failed in ${duration}ms ${userEmail} ${method} ${path}, ${err?.message}`,
        );
        return throwError(() => err);
      }),
    );
  }
}
