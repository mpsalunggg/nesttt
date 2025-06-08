import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';

@Injectable()
export class MemberService {
  constructor(private moduleRef: ModuleRef) {}
  getConnection() {
    const connection = this.moduleRef.get(Connection);
    return connection.getConnection();
  }

  sendMemberMail() {
    const mail = this.moduleRef.get(MailService);
    mail.send();
  }
}
