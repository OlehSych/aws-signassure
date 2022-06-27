import 'reflect-metadata';
import { Handler } from 'aws-lambda';

import { bootstrap } from '../';
import { FilesResolver } from './files.resolver';

export const getUploadUrl: Handler = async (event) => {
  const { fileInput } = event.arguments;

  return (await bootstrap()).get(FilesResolver).getUploadUrl(fileInput);
};

export const getFileUrl: Handler = async (event) => {
  const { fileInput } = event.arguments;

  return (await bootstrap()).get(FilesResolver).getFileUrl(fileInput);
};
