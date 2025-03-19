import { Controller, Get, Post, Req } from '@nestjs/common';
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

  @Get('/:id')
  getById(@Req() request: Request): string {
    return `Get by id : ${request.params.id}`;
  }
}
