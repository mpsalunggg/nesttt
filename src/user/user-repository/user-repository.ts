import { Connection } from '../connection/connection';

export class UserRepository {
  connection: Connection;

  save() {
    console.info(
      `save user with connection ${this.connection.getConnection()}`,
    );
  }
}

export const createUserRepository = (
  connection: Connection,
): UserRepository => {
  const userRepository = new UserRepository();
  userRepository.connection = connection;
  return userRepository;
};
