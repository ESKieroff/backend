import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/user/repository/user.repository';

@Injectable()
export class UserService {
  getHello(): string {
    throw new Error('Method not implemented.');
  }
  constructor(private userRepository: UserRepository) {}

  async findAllUsers() {
    return await this.userRepository.findAll();
  }
}
export default UserService;
