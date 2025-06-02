import { BadRequestException } from '@nestjs/common';

// Maximum file size (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

// Allowed MIME types for images and videos
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'video/x-ms-wmv',
  'video/x-msvideo',
];

export function validateFiles(files: Express.Multer.File[]) {
  if (!files || files.length === 0) return;

  for (const file of files) {
    if (file.size > MAX_FILE_SIZE) {
      throw new BadRequestException(
        `File ${file.originalname} is too large. Maximum size is 10MB.`,
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type for ${file.originalname}. Only images and videos are allowed.`,
      );
    }
  }
}
