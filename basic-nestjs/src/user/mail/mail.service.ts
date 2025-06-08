import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  send() {
    console.info('Sending email...');
  }
}
