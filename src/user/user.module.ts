import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import {
  Connection,
  MongoConnection,
  MysqlConnection,
} from './connection/connection';
import { MailService } from './mail/mail.service';
import {
  createUserRepository,
  UserRepository,
} from './user-repository/user-repository';

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
    {
      provide: 'MailService',
      useExisting: MailService,
    },
    {
      provide: UserRepository,
      useFactory: createUserRepository,
      inject: [Connection],
    },
  ],
})
export class UserModule {}
