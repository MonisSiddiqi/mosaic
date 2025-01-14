import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { configValidationSchema } from './config/config-validation.schema';

import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthCookieMiddleware } from './common/middleware/auth-cookie.middleware';
import { AuthController } from './auth/auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PrismaModule } from './prisma/prisma.module';
import { ServicesController } from './services/service.controller';
import { StorageModule } from './storage/storage.module';
import { ServicesModule } from './services/services.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env', `.env.${process.env.NODE_ENV}`],
      load: [configuration],
      validationSchema: configValidationSchema,
      validationOptions: {
        convert: true,
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    ServeStaticModule.forRoot({
      exclude: ['/api/(.*)', '/storage/(.*)', '/log-out'],
    }),
    AuthModule,
    PrismaModule,
    StorageModule,
    ServicesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthCookieMiddleware)
      .exclude(
        { path: '/auth/login', method: RequestMethod.POST },
        { path: '/auth/logout', method: RequestMethod.DELETE },
        { path: '/auth/check', method: RequestMethod.POST },
        { path: '/notification/receive', method: RequestMethod.GET },
        { path: '/notification', method: RequestMethod.GET },
      )
      .forRoutes(AuthController, ServicesController, UsersController);
  }
}
