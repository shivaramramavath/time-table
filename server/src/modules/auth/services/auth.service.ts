import { BadRequestException, Injectable } from '@nestjs/common';
import { EmailQueue } from 'src/infrastructure/email/queue/email.queue';
import { UserService } from 'src/modules/user/services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { SignInDto } from '../dtos/sign-in.dto';
import { JwtTokenService } from './jwt/jwt.service';
import { PasswordService } from './password/password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly jwtTokenService: JwtTokenService,
    private readonly emailQueue: EmailQueue,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    // hash password
    createUserDto.password = await this.passwordService.hash(
      createUserDto.password,
    );

    // create user
    const user = await this.userService.create(createUserDto);

    // send verification email
    await this.emailQueue.send({
      toEmail: user.email,
      toName: user.userName,
      subject: 'Verify your email',
      htmlContent: `
        <h1>Welcome ${user.userName}</h1>
        <p>
          Please verify your email address.
        </p>
      `,
    });

    // sign access token
    const accessToken = this.jwtTokenService.signAccessToken({
      sub: user?._id?.toString(),
      email: user.email,
    });

    return {
      accessToken,
      user,
    };
  }

  async signIn(signInDto: SignInDto) {
    // get user with password
    const user = await this.userService.findByEmailWithPassword(
      signInDto.email,
    );

    // verify password
    const isPasswordValid = await this.passwordService.verify(
      signInDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    // sign access token
    const accessToken = this.jwtTokenService.signAccessToken({
      sub: user?._id?.toString(),
      email: user.email,
    });

    return {
      accessToken,
      user,
    };
  }

  async refresh() {}

  async signOut() {}

  async forgotPassword() {}

  async resetPassword() {}
}
