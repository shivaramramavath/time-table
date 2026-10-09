import { Injectable, UnauthorizedException } from '@nestjs/common';

import { EmailService } from 'src/infrastructure/email/email.service';
import { UserService } from 'src/modules/user/services/user.service';

import { ForgotPasswordDto, SignInDto, SignUpDto } from '../dtos';
import { JwtTokenService } from './jwt/jwt.service';
import { PasswordService } from './password/password.service';
import { SessionService } from './session/session.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly jwtTokenService: JwtTokenService,
    private readonly sessionService: SessionService,
    private readonly emailService: EmailService,
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
    const accessToken = this.jwtTokenService.signAccessToken({
      sub: userId,
      email: user.email,
    });

    // Email failure should ideally be handled by a retryable queue.
    try {
      await this.emailService.signUpGreeting({
        toEmail: user.email,
        toName: user.userName,
        data: {
          userName: user.userName,
          email: user.email,
        },
      });
    } catch {
      // Do not log passwords or tokens.
      // Queue/retry the greeting email in production.
    }

    return {
      accessToken,
      refreshToken: session.refreshToken,
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
    const isPasswordValid = await this.passwordService.verify(
      signInDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const userId = user._id.toString();

    const session = await this.sessionService.create(userId, user.email);

    // Generate the access token
    const accessToken = this.jwtTokenService.signAccessToken({
      sub: userId,
      email: user.email,
    });

    return {
      accessToken,
      refreshToken: session.refreshToken,
      user,
    };
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    const rotatedSession = await this.sessionService.rotate(refreshToken);

    const accessToken = this.jwtTokenService.signAccessToken({
      sub: rotatedSession.sub,
      email: rotatedSession.email,
    });

    return {
      accessToken,
      refreshToken: rotatedSession.refreshToken,
    };
  }

  async signOut(refreshToken: string) {
    if (!refreshToken) {
      return { success: true };
    }

    const session = await this.sessionService.find(refreshToken);

    await this.sessionService.destroy(session.sid, session.sub);

    return { success: true };
  }

  forgotPassword(dto: ForgotPasswordDto) {
    return { token: 'token' };
  }

  resetPassword({ token, password }) {
    return { success: true };
  }
}
