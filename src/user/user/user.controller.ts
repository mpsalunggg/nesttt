import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
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
}
