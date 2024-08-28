import { Test } from '@nestjs/testing';
import { UserController } from '../../infrastructure/web/controllers/user.controller';
import { UserService } from '../../core/application/services/user.service';
describe('UserController', () => {
  let controller;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: { findAllUsers: jest.fn() } },
      ],
    }).compile();
    controller = module.get(UserController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
