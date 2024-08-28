import { Test } from '@nestjs/testing';
import { UserService } from '../../src/core/application/services/user.service.js';
import { UserRepository } from '../../src/infrastructure/user/repository/user.repository.js';
describe('UserService', () => {
  let service;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: { findAll: jest.fn() } },
      ],
    }).compile();
    service = module.get(UserService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
