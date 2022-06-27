import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DynamooseModule } from 'nestjs-dynamoose';

import { FilesModule } from './files/files.module';
import { CognitoModule } from './cognito/cognito.module';
import { MailerModule } from './mailer/mailer.module';
import { MailerTemplateModule } from './mailer-template/mailer-template.module';
import { UsersModule } from './users/users.module';
import { CompanyModule } from './company/company.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
      playground: !!process.env.IS_NOT_SLS && {
        endpoint: '/graphql',
      },
    }),
    DynamooseModule.forRoot({
      local: !!process.env.IS_DDB_LOCAL,
      logger: !!process.env.IS_NOT_SLS,
      aws: { region: process.env.REGION },
      model: {
        create: false,
        prefix: `${process.env.STAGE}-`,
        suffix: '-table',
      },
    }),
    AdminModule,
    FilesModule,
    CognitoModule,
    MailerModule,
    MailerTemplateModule,
    UsersModule,
    CompanyModule,
  ],
})
export class AppModule {}
