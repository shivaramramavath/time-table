import { UserService } from '#features/user/user.service.js';

import { PasswordService } from './services/password.service.js';
import { SessionService } from './services/session.service.js';
import { TokenService } from './services/token.service.js';
import { QueueService } from '#services/queue.service.js';

import type { LoginDto, RegisterDto } from './types/auth.types.js';
import createHttpError from 'http-errors';

export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly sessionService: SessionService,
    private readonly tokenService: TokenService,
    private readonly queueService: QueueService,
  ) {}

  async register(data: RegisterDto) {
    const hashedPassword = await this.passwordService.hash(data.password);

    const user = await this.userService.create({
      ...data,
      password: hashedPassword,
    });

    const { refreshToken } = await this.sessionService.create(user._id.toString());

    const accessToken = await this.tokenService.generateAccessToken(user._id.toString());

    this.queueService.registerGreeting({
      email: user.email,
      userName: user.userName,
    });

    return {
      user,
      refreshToken,
      accessToken,
    };
  }

  async login(data: LoginDto) {
    const user = await this.userService.findByEmailWithPassword(data.email);

    if (!user) {
      throw createHttpError.NotFound('User not found');
    }

    const isPasswordValid = await this.passwordService.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw createHttpError.Unauthorized('Invalid password');
    }

    const accessToken = this.tokenService.generateAccessToken(user._id.toString());

    const { refreshToken } = await this.sessionService.create(user._id.toString());

    return {
      user: {
        userName: user.userName,
        email: user.email,
      },
      accessToken,
      refreshToken,
    };
  }

  async googleLogin(email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw createHttpError.NotFound('User not found');
    }

    const accessToken = this.tokenService.generateAccessToken(user._id.toString());

    const { refreshToken } = await this.sessionService.create(user._id.toString());

    return {
      user: {
        userName: user.userName,
        email: user.email,
      },
      accessToken,
      refreshToken,
    };
  }

  async googleRegister(data: RegisterDto) {
    const generatedPassword = this.passwordService.generatePassword();

    const hashedPassword = await this.passwordService.hash(generatedPassword);

    const user = await this.userService.create({
      ...data,
      password: hashedPassword,
    });

    const { refreshToken } = await this.sessionService.create(user._id.toString());

    const accessToken = this.tokenService.generateAccessToken(user._id.toString());

    this.queueService.registerGreeting({
      email: user.email,
      userName: user.userName,
    });

    return {
      user,
      refreshToken,
      accessToken,
    };
  }

  async me(userId: string) {
    return this.userService.findById(userId);
  }

  async logout(refreshToken: string) {
    await this.sessionService.revoke(refreshToken);
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw createHttpError.NotFound('User not found');
    }

    const token = await this.sessionService.generateForgotPasswordToken(user._id.toString());

    this.queueService.forgotPassword({
      email: user.email,
      token,
    });
  }

  async resetPassword(token: string, password: string) {
    const userId = await this.sessionService.getUserIdFromPasswordResetToken(token);

    const hashedPassword = await this.passwordService.hash(password);

    await this.userService.updatePassword(userId, hashedPassword);
  }

  async refresh(refreshToken: string) {
    const { userId, refreshToken: newRefreshToken } =
      await this.sessionService.rotate(refreshToken);

    const accessToken = await this.tokenService.generateAccessToken(userId);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
}
