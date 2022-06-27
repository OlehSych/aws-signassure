import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as ses from 'node-ses';

import { MailerTemplateService } from '../mailer-template/mailer-template.service';
import { EmailOptionsDto } from './dto/email-options.dto';

@Injectable()
export class MailerService {
  private readonly ses;
  private readonly defaultSender;
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerTemplateService: MailerTemplateService,
  ) {
    this.ses = ses.createClient({
      key: this.configService.get('ACCESS_KEY_ID_AWS') as string,
      secret: this.configService.get('SECRET_ACCESS_KEY_AWS') as string,
    });
    this.defaultSender = this.configService.get('DEFAULT_EMAIL_SENDER');
  }

  sendEmail(emailOptions: EmailOptionsDto): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ses.sendEmail(
        {
          from: this.defaultSender,
          ...emailOptions,
        },
        (err) => {
          if (err) {
            console.error(err);
            return reject(err);
          }
          return resolve();
        },
      );
    });
  }

  async sendInvitationEmail(email: string, link: string): Promise<void> {
    const message = await this.mailerTemplateService.invitationTemplate({
      link,
    });
    await this.sendEmail({
      to: email,
      subject: 'Registration SignAssure',
      message,
    });
  }

  async sendResetPasswordEmail(email: string, link: string): Promise<void> {
    const message = await this.mailerTemplateService.resetPasswordTemplate({
      link,
    });
    await this.sendEmail({
      to: email,
      subject: 'Reset password SignAssure',
      message,
    });
  }
}
