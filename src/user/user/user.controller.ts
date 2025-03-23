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
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';

@Controller('/api/user')
export class UserController {
  constructor(
    private service: UserService,
    private connection: Connection,
    private mail: MailService,
    private userRepository: UserRepository,
  ) {}

  @Get('/connection')
  getConnection(): string | null {
    this.userRepository.save()
    this.mail.send();
    return this.connection.getConnection();
  }

  @Get('/hello')
  getHello(@Query('name') name: string) {
    return this.service.sayHello(name);
  }

  @Get('/view/hello/ges')
  getViewHello(
    @Query('name') name: string,
    @Query('role') role: string,
    @Res() response: Response,
  ) {
    response.render('index.html', {
      title: 'Template',
      name,
      role,
    });
  }

  @Get('/set-cookie')
  setCookie(@Query('title') title: string, @Res() response: Response) {
    response.cookie('name', title);
    response.status(200).send('succss set cookie');
  }

  @Get('/get-cookie')
  getCookie(@Req() request: Request) {
    return request.cookies['name'];
  }

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

  @Get('/async')
  async getAsync(): Promise<string> {
    return 'test';
  }
}
