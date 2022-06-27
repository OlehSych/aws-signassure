import fs from 'fs/promises';
import path from 'path';

import { Injectable } from '@nestjs/common';

import { InvitationTemplateDto } from './dto/invitation-template.dto';

const TEMPLATES = {
  INVITATION: 'invitation.html',
  RESET_PASSWORD: 'reset-password.html',
};

// TODO: refactor
/*
 * when webpack minifies the code, it doesn't include 'templates' folder, so I can't load template files
 * html templates should be loaded from html files, bcz they can take a lot of space and contain styles, images etc.
 * */
const cache: Record<string, string> = {
  [TEMPLATES.INVITATION]:
    '<p>Please click the following <a href="{{ link }}" target="_blank">link</a> so you can start using your account.</p>',
  [TEMPLATES.RESET_PASSWORD]:
    '<p>Please click the following <a href="{{ link }}" target="_blank">link</a> to reset your password.</p>',
};

@Injectable()
export class MailerTemplateService {
  private static async getTemplate(filename: string): Promise<string> {
    if (!cache[filename]) {
      const filepath = path.join(__dirname, 'templates', filename);
      cache[filename] = await fs.readFile(filepath, 'utf8');
    }
    return cache[filename];
  }

  private static formatTemplate(html: string, data: any): string {
    return html.replace(
      /{{(.+?)}}/g,
      (_substr: string, placeholder: string) => data[placeholder.trim()] || '',
    );
  }

  async invitationTemplate(data: InvitationTemplateDto): Promise<string> {
    const template = await MailerTemplateService.getTemplate(
      TEMPLATES.INVITATION,
    );
    return MailerTemplateService.formatTemplate(template, data);
  }

  async resetPasswordTemplate(data: InvitationTemplateDto): Promise<string> {
    const template = await MailerTemplateService.getTemplate(
      TEMPLATES.RESET_PASSWORD,
    );
    return MailerTemplateService.formatTemplate(template, data);
  }
}
