import { Injectable } from '@nestjs/common';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

import { FileInput } from './dto/file.input';

@Injectable()
export class FilesService {
  private readonly s3Client: S3Client;
  private readonly bucketId: string;
  private readonly expiresIn: number;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get('REGION'),
    });
    this.bucketId = this.configService.get('S3_BUCKET_ID') as string;
    this.expiresIn = Number(this.configService.get('S3_URL_EXPIRE_TIME'));
  }

  private getBucketParams({ userId, companyId, filename }: FileInput) {
    const userPart = userId ? `/${userId}` : '';
    return {
      Bucket: this.bucketId,
      Key: `${companyId}${userPart}/${filename}`,
    };
  }

  private getSignedUrl(
    fileInput: FileInput,
    Command: typeof GetObjectCommand | typeof PutObjectCommand,
  ): Promise<string> {
    const command = new Command(this.getBucketParams(fileInput));
    return getSignedUrl(this.s3Client, command, {
      expiresIn: this.expiresIn,
    });
  }

  async getUploadUrl(fileInput: FileInput): Promise<string> {
    return await this.getSignedUrl(fileInput, PutObjectCommand);
  }

  async getFileUrl(fileInput: FileInput): Promise<string> {
    return await this.getSignedUrl(fileInput, GetObjectCommand);
  }
}
