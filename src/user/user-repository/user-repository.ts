import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { User } from '@prisma/client';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import {
  WINSTON_MODULE_NEST_PROVIDER,
  WINSTON_MODULE_PROVIDER,
} from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class UserRepository {
  // connection: Connection;
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger2: Logger,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: LoggerService,
  ) {
    this.logger2.info('create user repository');
  }

  // save() {
  //   console.info(
  //     `save user with connection ${this.connection.getConnection()}`,
  //   );
  // }
  logSomething() {
    this.logger.log('NestJS Logger!');
    this.logger.warn('Warning!');
    this.logger.error('Error terjadi!');
  }

  async createUser(firstname: string, lastname?: string): Promise<User> {
    this.logger2.info(
      `create user with firstName: ${firstname} and lastName: ${lastname}`,
    );
    return this.prismaService.user.create({
      data: {
        first_name: firstname,
        last_name: lastname,
      },
    });
  }
}

// export const createUserRepository = (
//   connection: Connection,
// ): UserRepository => {
// const userRepository = new UserRepository();
// userRepository.connection = connection;
// return userRepository;
// };
