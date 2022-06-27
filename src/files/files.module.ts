import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FilesResolver } from './files.resolver';
import { FilesService } from './files.service';

@Module({
  imports: [ConfigModule],
  providers: [FilesService, FilesResolver],
  exports: [FilesService],
})
export class FilesModule {}
