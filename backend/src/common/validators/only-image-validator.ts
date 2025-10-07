import { FileValidator } from '@nestjs/common';

export class OnlyImageValidator extends FileValidator<Record<string, never>> {
  isValid(file?: Express.Multer.File): boolean {
    return !!file?.mimetype?.startsWith('image/');
  }

  buildErrorMessage(): string {
    return;
  }
}
