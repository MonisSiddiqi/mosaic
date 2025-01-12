import { Module } from '@nestjs/common';
import { ServicesController } from './service.controller';
import { ServicesService } from './services.service';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServiceModule {}
