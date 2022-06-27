export class EmailOptionsDto {
  from?: string;
  to: string;
  subject: string;
  message: string;
  replyTo?: string;
  cc?: string;
  bcc?: string[];
  altText?: string;
}
