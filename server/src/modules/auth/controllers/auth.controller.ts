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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import type { Response } from 'express';

import { CookieService } from '../../../shared/core/security/cookie/cookie.service';
import { ForgotPasswordDto, PasswordDto, SignInDto, SignUpDto } from '../dtos';
import type { PasswordResetRequest } from '../guards/password-reset.guard';
import { PasswordResetGuard } from '../guards/password-reset.guard';
import type { RefreshTokenRequest } from '../guards/refresh-token.guard';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';
import { AuthService } from '../services/auth.service';

export const REFRESH_COOKIE = 'refreshToken';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user account' })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({ status: 201, description: 'Account created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid registration data' })
  @ApiResponse({ status: 409, description: 'Account already exists' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() createUserDto: SignUpDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken, ...data } =
      await this.authService.signUp(createUserDto);

    this.cookieService.set(response, REFRESH_COOKIE, refreshToken);

    return { data, success: true };
  }

  @Post('signin')
  @ApiOperation({ summary: 'Sign in to an existing account' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({ status: 200, description: 'Signed in successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken, ...data } = await this.authService.signIn(signInDto);

    this.cookieService.set(response, REFRESH_COOKIE, refreshToken);

    return { data, success: true };
  }

  @Post('refresh')
  @ApiOperation({
    summary: 'Refresh the access token using the refresh cookie',
  })
  @ApiResponse({ status: 200, description: 'Tokens refreshed successfully' })
  @ApiResponse({ status: 401, description: 'Missing or invalid refresh token' })
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() request: RefreshTokenRequest,
    @Res({ passthrough: true }) response: Response,
  ) {
    const payload = request.refreshTokenPayload!;

    const { refreshToken, ...data } = await this.authService.refresh(payload);

    this.cookieService.set(response, REFRESH_COOKIE, refreshToken);

    return { data, success: true };
  }

  @Post('signout')
  @ApiOperation({ summary: 'Sign out and invalidate the refresh token' })
  @ApiResponse({ status: 200, description: 'Signed out successfully' })
  @ApiResponse({ status: 401, description: 'Missing or invalid refresh token' })
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
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
  @ApiOperation({ summary: 'Request password-reset instructions' })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiResponse({ status: 200, description: 'Password-reset request processed' })
  @ApiResponse({ status: 400, description: 'Invalid email address' })
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
  @ApiOperation({ summary: 'Reset password using a valid reset token' })
  @ApiBody({ type: PasswordDto })
  @ApiResponse({ status: 200, description: 'Password reset successfully' })
  @ApiResponse({ status: 401, description: 'Missing or invalid reset token' })
  @ApiResponse({ status: 400, description: 'Invalid password data' })
  @UseGuards(PasswordResetGuard)
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Req() request: PasswordResetRequest,
    @Body() dto: PasswordDto,
  ) {
    await this.authService.resetPassword({
      userId: request.passwordResetPayload?.sub as string,
      password: dto.password,
    });

    return {
      data: { message: 'Password reset successfully' },
      success: true,
    };
  }
}
