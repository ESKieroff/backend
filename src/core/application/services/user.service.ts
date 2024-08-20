import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/user/repository/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findAllUsers() {
    return await this.userRepository.findAll();
  }
}