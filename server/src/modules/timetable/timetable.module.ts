import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GuardModule } from '../../common/guards/guard.module';
import { JwtTokenModule } from '../auth/services/jwt/jwt-token.module';
import { TimetableController } from './controllers/timetable.controller';
import { Timetable, TimetableSchema } from './entities/timetable.entity';
import { TimetableRepository } from './repository/timetable.repository';
import { TimetableService } from './services/timetable.service';

@Module({
  imports: [
    GuardModule,
    JwtTokenModule,
    MongooseModule.forFeature([
      {
        name: Timetable.name,
        schema: TimetableSchema,
      },
    ]),
  ],
  controllers: [TimetableController],
  providers: [TimetableService, TimetableRepository],
})
export class TimetableModule {}
