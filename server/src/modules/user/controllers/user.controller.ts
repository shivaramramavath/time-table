import { Controller, Get, Patch } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  async getProfile() {
    const userId = '133';

    const user = await this.userService.getProfile(userId);
    return {
      data: user,
      success: true,
    };
  }

  @Patch('/profile')
  async updateProfile() {
    const userId = '133';

    const user = await this.userService.update(userId, {});

    return {
      data: user,
      success: true,
    };
  }
}
