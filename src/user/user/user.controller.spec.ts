import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be say hello name', async () => {
    const response = await controller.getHello('mps');
    expect(response).toBe('Hello mps');
  });

  it('should return "Hello World!"', () => {
    expect(controller.post()).toBe('Testt Post');
  });

  it('should can view  template', async () => {
    const response = httpMock.createResponse();
    controller.getViewHello('mps', 'frontend', response);

    expect(response._getRenderView()).toBe('index.html');
    expect(response._getRenderData()).toEqual({
      name: 'mps',
      role: 'frontend',
      title: 'Template',
    });
  });
});
