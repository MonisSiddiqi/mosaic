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
import { ProjectsModule } from './projects/projects.module';
import { AddressesModule } from './addresses/addresses.module';
import { ProjectsController } from './projects/projects.controller';
import { MailModule } from './mail/mail.module';
import { MailController } from './mail/mail.controller';
import { AddressesController } from './addresses/addresses.controller';
import { TagsController } from './tags/tags.controller';
import { TagsModule } from './tags/tags.module';

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
    StorageModule,
    ServeStaticModule.forRoot({
      exclude: ['/api/(.*)', '/storage/(.*)', '/log-out'],
    }),
    AuthModule,
    PrismaModule,
    ServicesModule,
    UsersModule,
    ProjectsModule,
    AddressesModule,
    MailModule,
    TagsModule,
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
        { path: '/auth/verify-otp', method: RequestMethod.POST },
        { path: '/notification/receive', method: RequestMethod.GET },
        { path: '/notification', method: RequestMethod.GET },
      )
      .forRoutes(
        AuthController,
        ServicesController,
        UsersController,
        ProjectsController,
        MailController,
        UsersController,
        AddressesController,
        TagsController,
      );
  }
}
