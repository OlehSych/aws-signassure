import { Module } from '@nestjs/common';
import { MailerTemplateService } from './mailer-template.service';

@Module({
  providers: [MailerTemplateService],
  exports: [MailerTemplateService],
})
export class MailerTemplateModule {}
