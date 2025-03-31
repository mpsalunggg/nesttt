import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { Connection } from '../connection/connection';
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  // connection: Connection;
  constructor(private prismaService: PrismaService) {
    console.info('create user repository');
  }

  // save() {
  //   console.info(
  //     `save user with connection ${this.connection.getConnection()}`,
  //   );
  // }

  async createUser(firstname: string, lastname?: string): Promise<User> {
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
