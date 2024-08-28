import { Module } from '@nestjs/common';
import { UserService } from '../../core/application/services/user.service.js';
import { UserController } from './controllers/user.controller.js';
import { UserRepository } from './repository/user.repository.js';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
