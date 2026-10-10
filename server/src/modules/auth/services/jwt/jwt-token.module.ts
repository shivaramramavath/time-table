import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from './jwt-token.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('jwt.access.secret'),
      }),
    }),
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})
export class JwtTokenModule {}
