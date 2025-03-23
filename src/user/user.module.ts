import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import {
  Connection,
  MongoConnection,
  MysqlConnection,
} from './connection/connection';
import { MailService } from './mail/mail.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: Connection,
      useClass:
        process.env.DATABASE === 'mysql' ? MysqlConnection : MongoConnection,
    },
    {
      provide: MailService,
      useValue: new MailService(),
    },
  ],
})
export class UserModule {}
