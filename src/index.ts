import { NestFactory } from '@nestjs/core';
import { INestApplicationContext } from '@nestjs/common';

import { AppModule } from './app.module';

let app: INestApplicationContext;

export async function bootstrap(): Promise<INestApplicationContext> {
  app = app ?? (await NestFactory.createApplicationContext(AppModule));
  return app;
}
