import { Controller, Get } from '@nestjs/common';

@Controller('/api/user')
export class UserController {
  @Get('/sample')
  get(): string {
    return 'Hello World';
  }
}
