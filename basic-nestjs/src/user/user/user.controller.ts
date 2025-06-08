import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpRedirectResponse,
  Inject,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';
import { ModuleRef } from '@nestjs/core';
import { MemberService } from '../member/member.service';
import { User } from '@prisma/client';
import { ValidationFilter } from 'src/validation/validation.filter';
import { ValidationPipe } from 'src/validation/validation.pipe';
import {
  LoginUserRequest,
  loginUserRequestValidation,
} from 'src/model/login.model';
import { TimeInterceptor } from 'src/time/time.interceptor';
import { Auth } from 'src/auth/auth.decorator';
import { RoleGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/roles.decorator';

@Controller('/api/user')
export class UserController {
  constructor(
    private service: UserService,
    private connection: Connection,
    private mail: MailService,
    private userRepository: UserRepository,
    @Inject('MailService') private email: MailService,
    private memberService: MemberService,
  ) {}

  @Get('/test-log')
  testLog() {
    return this.userRepository.logSomething();
  }

  // should be post http method
  @Get('/create')
  async createUser(
    @Query('first_name') first_name: string,
    @Query('last_name') last_name: string,
  ): Promise<User> {
    if (!first_name) {
      throw new HttpException(
        {
          code: 400,
          message: 'firstname should be required!',
        },
        400,
      );
    }
    return this.userRepository.createUser(first_name, last_name);
  }

  @Get('/connection')
  getConnection(): string | null {
    // this.userRepository.save();
    this.mail.send();
    this.email.send();

    console.info('Testt', this.memberService.getConnection());
    this.memberService.sendMemberMail();
    return this.connection.getConnection();
  }

  @Get('/hello')
  // @UseFilters(ValidationFilter)
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

  @Post('/login')
  // @UseFilters(ValidationFilter)
  @UsePipes(new ValidationPipe(loginUserRequestValidation))
  @Header('Content-Type', 'application/json')
  @UseInterceptors(TimeInterceptor)
  login(@Query('name') name: string, @Body() request: LoginUserRequest) {
    return {
      data: `Helloooo ${request.username}`,
    };
  }

  @Get('/current')
  @Roles(['admin'])
  current(@Auth() user: User): Record<string, any> {
    return {
      data: `Heloooo ${user.first_name} ${user.last_name}`,
    };
  }
}
