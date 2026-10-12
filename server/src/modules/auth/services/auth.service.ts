import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';
import { EmailService } from '../../../infrastructure/email/email.service';
import { PasswordService } from '../../../shared/core/security/password/password.service';
import { SessionService } from '../../../shared/core/security/session/session.service';
import { TokenService } from '../../../shared/core/security/token/token.service';
import { RefreshTokenPayload } from '../../../shared/core/security/token/token.types';
import { UserService } from '../../user/services/user.service';
import {
  ForgotPasswordDto,
  ResetPasswordDto,
  SignInDto,
  SignUpDto,
} from '../dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: PinoLogger,
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
    private readonly sessionService: SessionService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(createUserDto: SignUpDto) {
    // Hash the password
    const password = await this.passwordService.hash(createUserDto.password);

    // Create the user
    const user = await this.userService.create({
      ...createUserDto,
      password,
    });

    const userId = user._id.toString();

    // Create the session
    const session = await this.sessionService.create(userId, user.email);

    // Generate the access token
    const accessToken = this.tokenService.signAccessToken({
      sub: userId,
      email: user.email,
    });

    // Generate the refresh token
    const refreshToken = this.tokenService.signRefreshToken({
      sid: session.sid,
      sub: userId,
      email: user.email,
      secret: session.secret,
    });

    // Email failure should ideally be handled by a retryable queue.
    try {
      await this.emailService.sendSignupGreeting({
        recipient: {
          email: user.email,
          name: user.userName,
        },
        userName: user.userName,
      });
    } catch {
      // todo: handle email failure
    }

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async signIn(signInDto: SignInDto) {
    // Find the user
    const user = await this.userService.findByEmailWithPassword(
      signInDto.email,
    );

    // Use the same response for an unknown email and a wrong password.
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Verify the password
    const isPasswordValid = await this.passwordService.compare(
      signInDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const userId = user._id.toString();

    const session = await this.sessionService.create(userId, user.email);

    // Generate the access token
    const accessToken = this.tokenService.signAccessToken({
      sub: userId,
      email: user.email,
    });

    // Generate the refresh token
    const refreshToken = this.tokenService.signRefreshToken({
      sid: session.sid,
      sub: userId,
      email: user.email,
      secret: session.secret,
    });

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async refresh(payload: RefreshTokenPayload) {
    if (!payload) {
      throw new UnauthorizedException('Refresh token is required');
    }

    const { sid, secret } = payload;

    // rotate the session
    const rotatedSession = await this.sessionService.rotate({ sid, secret });

    // Generate the access token
    const accessToken = this.tokenService.signAccessToken({
      sub: rotatedSession.sub,
      email: rotatedSession.email,
    });

    // Generate the refresh token
    const refreshToken = this.tokenService.signRefreshToken({
      sid: rotatedSession.sid,
      sub: rotatedSession.sub,
      email: rotatedSession.email,
      secret: rotatedSession.secret,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async signOut(payload: RefreshTokenPayload) {
    if (!payload) {
      return { success: true };
    }

    await this.sessionService.destroy(payload.sid, payload.sub);

    return { success: true };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    // find the user
    const user = await this.userService.findByEmail(dto.email);

    // generate a password reset token
    const token = this.tokenService.signPasswordResetToken(user._id.toString());

    // send the password reset email
    await this.emailService.sendPasswordReset({
      recipient: {
        email: dto.email,
      },
      resetUrl: `${this.configService.get('originUrl')}/reset-password?token=${token}`,
    });

    console.log(
      `${this.configService.get('originUrl')}/reset-password?token=${token}`,
    );

    return {
      success: true,
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    // hash the password
    const hashedPassword = await this.passwordService.hash(dto.password);

    // update the password
    await this.userService.updatePassword(dto.userId, hashedPassword);

    await this.sessionService.destroyByUserId(dto.userId);

    // todo: single time use the token
    return { success: true };
  }
}
