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
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const logger = new Logger();

  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,PUT,DELETE,OPTIONS,PATCH',
      );
      res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
      res.header('Access-Control-Allow-Credentials', 'true');
      return res.sendStatus(204);
    }
    next();
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
