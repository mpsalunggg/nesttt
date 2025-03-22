import { Injectable } from '@nestjs/common';

@Injectable()
export class Connection {
  getConnection(): string | null {
    return null;
  }
}

@Injectable()
export class MysqlConnection extends Connection {
  getConnection(): string | null {
    return 'Mysql';
  }
}

@Injectable()
export class MongoConnection extends Connection {
  getConnection(): string | null {
    return 'Mongo';
  }
}
