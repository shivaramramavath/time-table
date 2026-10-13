import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../../shared/database/repositories/base.repository';
import { TimetableDocument } from '../../timetable/entities/timetable.entity';
import { Template } from '../entities/template.entity';

@Injectable()
export class TemplatesRepository extends BaseRepository<TimetableDocument> {
  constructor(
    @InjectModel(Template.name)
    private readonly templateModel: Model<TimetableDocument>,
  ) {
    super(templateModel);
  }
}
