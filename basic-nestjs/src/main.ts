import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as mustacheExpress from 'mustache-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ValidationFilter } from './validation/validation.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.use(cookieParser('COOKIE TEST'));

  app.useLogger(logger);

  app.engine('html', mustacheExpress());

  app.setViewEngine('html');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.useGlobalFilters(new ValidationFilter());

  // app.useGlobalPipes(...)
  // app.useGlobalInterceptors(...)
  // app.useGlobalGuards(...)
  app.enableShutdownHooks()
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT') as string);
}
bootstrap();
