import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';

import {
  ForgotPasswordDto,
  ResetPasswordDto,
  SignInDto,
  SignUpDto,
} from '../dtos';
import { AuthService } from '../services/auth.service';
import { CookieService } from '../services/cookie/cookie.service';

const REFRESH_COOKIE = 'refreshToken';

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
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = this.cookieService.get(request, REFRESH_COOKIE);

    const { refreshToken: rotatedToken, ...data } =
      await this.authService.refresh(refreshToken);

    this.cookieService.set(response, REFRESH_COOKIE, rotatedToken);

    return {
      data,
      success: true,
    };
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  async signOut(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      await this.authService.signOut(
        this.cookieService.get(request, REFRESH_COOKIE),
      );
    } finally {
      response.clearCookie(REFRESH_COOKIE, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/api/auth',
      });
    }

    return {
      data: { success: true },
      success: true,
    };
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    const { token } = this.authService.forgotPassword(dto);

    return {
      data: {
        message:
          'If an account matches that email, password-reset instructions will be sent.',
        token,
      },
      success: true,
    };
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() dto: ResetPasswordDto) {
    this.authService.resetPassword(dto);

    return {
      data: { message: 'Password reset successfully' },
      success: true,
    };
  }
}
