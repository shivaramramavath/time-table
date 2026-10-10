import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GuardModule } from '../../common/guards/guard.module';
import { JwtTokenModule } from '../auth/services/jwt/jwt-token.module';
import { UserController } from './controllers/user.controller';
import { User, UserSchema } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { UserService } from './services/user.service';

@Module({
  imports: [
    GuardModule,
    JwtTokenModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
