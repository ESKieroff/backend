import { Controller, Get } from '@nestjs/common';
import { UserService } from '../../../core/application/services/user.service.js';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll() {
    return await this.userService.findAllUsers();
  }
}
export default UserController;