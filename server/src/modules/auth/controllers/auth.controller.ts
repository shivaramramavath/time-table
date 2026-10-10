import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';

import { ForgotPasswordDto, PasswordDto, SignInDto, SignUpDto } from '../dtos';
import type { RefreshTokenRequest } from '../guards/refresh-token.guard';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';

import type { PasswordResetRequest } from '../guards/password-reset.guard';
import { PasswordResetGuard } from '../guards/password-reset.guard';
import { AuthService } from '../services/auth.service';
import { CookieService } from '../services/cookie/cookie.service';

export const REFRESH_COOKIE = 'refreshToken';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() createUserDto: SignUpDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken, ...data } =
      await this.authService.signUp(createUserDto);

    this.cookieService.set(response, REFRESH_COOKIE, refreshToken);

    return {
      data,
      success: true,
    };
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken, ...data } = await this.authService.signIn(signInDto);

    this.cookieService.set(response, REFRESH_COOKIE, refreshToken);

    return {
      data,
      success: true,
    };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshTokenGuard)
  async refresh(
    @Req() request: RefreshTokenRequest,
    @Res({ passthrough: true }) response: Response,
  ) {
    const payload = request.refreshTokenPayload!;

    const { refreshToken, ...data } = await this.authService.refresh(payload);

    this.cookieService.set(response, REFRESH_COOKIE, refreshToken);

    return {
      data,
      success: true,
    };
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshTokenGuard)
  async signOut(
    @Req() request: RefreshTokenRequest,
    @Res({ passthrough: true }) response: Response,
  ) {
    const payload = request.refreshTokenPayload!;

    await this.authService.signOut(payload);

    this.cookieService.remove(response, REFRESH_COOKIE);

    return {
      data: { success: true },
      success: true,
    };
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    await this.authService.forgotPassword(dto);

    return {
      data: {
        message:
          'If an account matches that email, password-reset instructions will be sent.',
      },
      success: true,
    };
  }

  @Post('reset-password')
  @UseGuards(PasswordResetGuard)
  @HttpCode(HttpStatus.OK)
  resetPassword(
    @Req() request: PasswordResetRequest,
    @Body() dto: PasswordDto,
  ) {
    this.authService.resetPassword({
      userId: request.passwordResetPayload?.sub as string,
      password: dto.password,
    });

    return {
      data: { message: 'Password reset successfully' },
      success: true,
    };
  }
}
