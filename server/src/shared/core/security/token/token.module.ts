import { Global, Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../../../../config';
import { JwtTokenService } from './jwt-token.service';
import { TokenService } from './token.service';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('jwt.access.secret'),
      }),
    }),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    {
      provide: TokenService,
      useClass: JwtTokenService,
    },
  ],
  exports: [TokenService],
})
export class TokenModule {}
