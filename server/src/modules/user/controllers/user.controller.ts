import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import {
  type AuthenticatedRequest,
  AuthenticateGuard,
} from '../../../common/guards/authenticate.guard';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserService } from '../services/user.service';

@UseGuards(AuthenticateGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() request: AuthenticatedRequest) {
    const user = await this.userService.getProfile(request.user.id);
    return {
      data: user,
      success: true,
    };
  }

  @Patch('/profile')
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @Req() request: AuthenticatedRequest,
    @Body() dto: UpdateUserDto,
  ) {
    const user = await this.userService.update(request.user.id, dto);

    return {
      data: user,
      success: true,
    };
  }
}
