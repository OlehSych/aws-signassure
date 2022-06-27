import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';

import { MailerModule } from '../mailer/mailer.module';
import { UsersModule } from '../users/users.module';
import { CompanyService } from './company.service';
import { CompanyResolver } from './company.resolver';
import { CompanyRepository } from './company.repository';
import { CompanySchema } from './schema/company.schema';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'company',
        schema: CompanySchema,
      },
    ]),
    MailerModule,
    UsersModule,
  ],
  providers: [CompanyResolver, CompanyService, CompanyRepository],
})
export class CompanyModule {}
