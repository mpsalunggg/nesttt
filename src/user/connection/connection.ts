import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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

export const createConnection = (configService: ConfigService): Connection => {
  if(configService.get('DATABASE') === 'mysql'){
    return new MysqlConnection()
  } else {
    return new MongoConnection()
  }
}
