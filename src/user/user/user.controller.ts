import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpRedirectResponse,
  Param,
  Post,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('/api/user')
export class UserController {
  @Get('/sample')
  get(): string {
    return 'Hello World';
  }

  @Post('/test-post')
  post(): string {
    return 'Testt Post';
  }

  @Get('/hello/:id')
  getById(@Req() request: Request): string {
    return `Get by id : ${request.params.id}`;
  }

  @Get('/hello')
  getHello(@Query('name') name: string) {
    return `Hai bro ${name}`;
  }

  @Get('/test/:id')
  getByIdV2(@Param('id') id: string) {
    return `ini id sekian :${id}`;
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Get('/sample-response')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  sample(): Record<string, string> {
    return {
      data: 'test 123',
    };
  }

  @Get('/redirect')
  @Redirect()
  redirect(): HttpRedirectResponse {
    return {
      url: '/api/user/sample-response',
      statusCode: 301,
    };
  }
}
