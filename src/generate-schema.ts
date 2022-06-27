import fs from 'fs';

import { NestFactory } from '@nestjs/core';
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql';
import { printSchema } from 'graphql';

import { AdminResolver } from './admin/admin.resolver';
import { CompanyResolver } from './company/company.resolver';
import { UsersResolver } from './users/users.resolver';
import { FilesResolver } from './files/files.resolver';

(async () => {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create([
    AdminResolver,
    CompanyResolver,
    UsersResolver,
    FilesResolver,
  ]);

  fs.writeFileSync('schema.gql', printSchema(schema));
})();
