import { Resolver, Query, Args } from '@nestjs/graphql';
import { FileInput } from './dto/file.input';
import { FilesService } from './files.service';

@Resolver(() => String)
export class FilesResolver {
  constructor(private readonly filesService: FilesService) {}

  @Query(() => String)
  async getUploadUrl(@Args('fileInput') fileInput: FileInput) {
    return await this.filesService.getUploadUrl(fileInput);
  }

  @Query(() => String)
  async getFileUrl(@Args('fileInput') fileInput: FileInput) {
    return await this.filesService.getFileUrl(fileInput);
  }
}
