import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  GetObjectCommand,
  GetObjectCommandOutput,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsCommand,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { Injectable, Logger } from '@nestjs/common';
import { writeFile } from 'fs-extra';
import tmp from 'tmp-promise';
import { readFileSync } from 'fs';
import sharp from 'sharp';
import { NodeHttpHandler } from '@smithy/node-http-handler';
import * as http from 'node:http';
import * as https from 'node:https';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { NodeEnv, S3Config } from '../config/config.type';
import { StorageFolderEnum } from './storage-folder.enum';
import { extname } from 'node:path';

import mime from 'mime';

@Injectable()
export class StorageService {
  private readonly s3Client: S3Client;
  private readonly region: string;
  private readonly bucketName: string;
  private readonly config: S3Config;

  logger = new Logger(StorageService.name);

  constructor(private readonly configService: ConfigService) {
    const config = this.configService.get<S3Config>('s3');
    const nodeEnv = this.configService.get<NodeEnv>('nodeEnv');

    this.config = config;

    this.region = config?.region || '';
    this.bucketName = config?.bucketName || '';

    this.s3Client = new S3Client({
      region: this.region,
      requestHandler: new NodeHttpHandler({
        httpAgent: new http.Agent({
          keepAlive: true,
          maxSockets: 15000,
        }),
        httpsAgent: new https.Agent({
          keepAlive: true,
          maxSockets: 15000,
        }),
      }),
      credentials: {
        accessKeyId: config?.accessKeyId || '',
        secretAccessKey: config?.secretAccessKey || '',
      },
      // endpoint: 'https://s3.amazonaws.com',
      forcePathStyle: true, // ✅ Use virtual-hosted-style URLs (recommended)
    });

    // this.warmUpS3Connection();
  }

  public async uploadFile(
    file: Express.Multer.File,
    folder: StorageFolderEnum,
  ) {
    const key = `${folder}/${uuidv4()}${extname(file.originalname)}`;

    this.logger.debug(`Uploading file ${key}`);

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: mime.getType(key),
    });

    await this.s3Client.send(command);

    this.logger.debug(`Uploaded file ${key}`);

    return key;
  }

  public async uploadSvgFile(file: Buffer, folder: StorageFolderEnum) {
    const key = `${folder}/${uuidv4()}.svg`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file,
      ContentType: 'image/svg+xml',
    });

    await this.s3Client.send(command);

    return key;
  }

  public async uploadImageFile(file: Buffer, folder: StorageFolderEnum) {
    const key = `${folder}/${uuidv4()}.webp`;

    const result = await this.compressImage(file);

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: result.buffer,
      ContentType: result.mimeType,
    });

    await this.s3Client.send(command);

    return key;
  }

  private async compressImage(file: Buffer) {
    const tmpDir = tmp.dirSync();

    const inputFilePath = `${tmpDir.name}/${uuidv4()}.png`;
    const outputFilePath = `${tmpDir.name}/${uuidv4()}.webp`;

    await writeFile(inputFilePath, file);

    const image = sharp(inputFilePath);

    const metadata = await image.metadata();

    if (metadata?.width && metadata?.height) {
      const newWidth = Math.round(metadata?.width * 0.75);
      const newHeight = Math.round(metadata?.height * 0.75);

      await image
        .resize(newWidth, newHeight)
        .webp({ quality: 80 })
        .toFile(outputFilePath);
    } else {
      await image.webp({ quality: 80 }).toFile(outputFilePath);
    }

    return {
      mimeType: 'image/webp',
      buffer: readFileSync(outputFilePath),
    };
  }

  public async findFile(
    folder: string,
    fileName: string,
  ): Promise<GetObjectCommandOutput> {
    const command = new GetObjectCommand({
      Key: `${folder}/${fileName}`,
      Bucket: this.bucketName,
    });

    return await this.s3Client.send(command);
  }

  public async getSignedFileUrl(key: string): Promise<string | null> {
    try {
      const command = new GetObjectCommand({
        Key: key,
        Bucket: this.bucketName,
      });

      return await getSignedUrl(this.s3Client, command, {
        expiresIn: 3600 * 24 * 2,
      });
    } catch (e) {
      return null;
    }
  }

  async deleteFile(key: string): Promise<void> {
    this.logger.debug(`Deleting ${key}`);
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    await this.s3Client.send(command);
    this.logger.debug(`Successfully deleted ${key}`);
  }
  private async warmUpS3Connection() {
    try {
      await this.s3Client.send(
        new ListObjectsCommand({ Bucket: this.bucketName }),
      );
      console.log('✅ AWS S3 Connection Warmed Up');
    } catch (err) {
      console.error('❌ AWS S3 Warm-Up Failed', err);
    }
  }
}
