import { Controller, Get } from '@nestjs/common';
import { UserService } from '../../../core/application/services/user.service.js';

@Controller()
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
export default UserController;
