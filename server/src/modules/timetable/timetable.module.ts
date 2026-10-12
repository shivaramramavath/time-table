import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GuardModule } from '../../shared/common/guards/guard.module';
import { TimetableController } from './controllers/timetable.controller';
import { Timetable, TimetableSchema } from './entities/timetable.entity';
import { TimetableRepository } from './repository/timetable.repository';
import { TimetableService } from './services/timetable.service';

@Module({
  imports: [
    GuardModule,
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
