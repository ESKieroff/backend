import { Module } from '@nestjs/common';
import { UserService } from '../../core/application/services/user.service';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repository/user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}