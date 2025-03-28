import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as mustacheExpress from 'mustache-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser('COOKIE TEST'));

  app.engine('html', mustacheExpress());

  app.setViewEngine('html');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  const configService = app.get(ConfigService)
  await app.listen(configService.get('PORT') as string);
}
bootstrap();
