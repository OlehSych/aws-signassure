import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';

import { CognitoModule } from '../cognito/cognito.module';
import { AdminSchema } from './schema/admin.schema';
import { AdminResolver } from './admin.resolver';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';

@Module({
  imports: [
    CognitoModule,
    DynamooseModule.forFeature([
      {
        name: 'admin',
        schema: AdminSchema,
      },
    ]),
  ],
  providers: [AdminResolver, AdminService, AdminRepository],
})
export class AdminModule {}
