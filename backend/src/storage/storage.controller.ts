import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { StorageService } from './storage.service';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { StorageFolderEnum } from './storage-folder.enum';

@Controller('storage')
export class StorageController {
  constructor(private storageService: StorageService) {}
  @Get('services/:file')
  @SkipAuth()
  public async getServiceIcon(
    @Res() response: Response,
    @Param('filename') fileName: string,
  ) {
    try {
      const file = await this.storageService.findFile(
        StorageFolderEnum.SERVICES,
        fileName,
      );

      response.set({
        'Content-Type': file.ContentType,
        'Content-Length': file.ContentLength,
        'Last-Modified': file.LastModified,
        'Content-Disposition': `inline; filename="${fileName}"`,
        'Cache-Control': 'public, max-age=604800',
      });

      response.send(file.Body);
    } catch (error) {
      throw new NotFoundException('File not found.');
    }
  }
}
