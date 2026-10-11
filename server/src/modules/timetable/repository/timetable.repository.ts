import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../../shared/database/repositories/base.repository';
import { Timetable, TimetableDocument } from '../entities/timetable.entity';

@Injectable()
export class TimetableRepository extends BaseRepository<TimetableDocument> {
  constructor(
    @InjectModel(Timetable.name)
    private readonly timetableModel: Model<TimetableDocument>,
  ) {
    super(timetableModel);
  }
}
