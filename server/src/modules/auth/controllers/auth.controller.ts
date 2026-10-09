import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { SignInDto } from '../dtos/sign-in.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const response = await this.authService.signUp(createUserDto);

    return {
      data: response,
      success: true,
    };
  }

  @Post('/signin')
  async signIn(@Body() signInDto: SignInDto) {
    const response = await this.authService.signIn(signInDto);

    return {
      data: response,
      success: true,
    };
  }

  @Get('/refresh')
  refresh() {}

  @Post('/signout')
  signOut() {}

  @Post('/forgot-password')
  forgotPassword() {}

  @Post('/reset-password')
  resetPassword() {}
}
