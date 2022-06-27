import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MailerTemplateModule } from '../mailer-template/mailer-template.module';
import { MailerService } from './mailer.service';

@Module({
  imports: [ConfigModule, MailerTemplateModule],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
