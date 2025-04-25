import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import {
  Logger,
  VERSION_NEUTRAL,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';

import cookieParser from 'cookie-parser';

import { ApiResponseInterceptor } from './common/interceptors/api-response.interceptor';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true });

  const configService = app.get(ConfigService);

  const logger = new Logger();

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type'],
  });

  app.setGlobalPrefix('api', {
    exclude: ['/storage/(.*)', '/samlLogin', '/log-out'],
  });

  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, '1'],
    type: VersioningType.URI,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const cookieSigningKey = configService.get<string>('cookie.signingKey');
  app.use(cookieParser(cookieSigningKey));

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ApiResponseInterceptor());

  app.useGlobalInterceptors(new LoggingInterceptor());

  app.enableShutdownHooks();

  const port = configService.get<number>('port');

  await app.listen(port as number);
  logger.log(`Application is running on port: ${port}`);
}

bootstrap();
