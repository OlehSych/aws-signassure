import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { DynamooseModule } from 'nestjs-dynamoose';
import { UserSchema } from './schema/user.schema';
import { CognitoModule } from '../cognito/cognito.module';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  imports: [
    ConfigModule,
    CognitoModule,
    MailerModule,
    DynamooseModule.forFeature([
      {
        name: 'user',
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UsersResolver, UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
