import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateTimetableDto } from '../dto/create-timetable.dto';
import { UpdateTimetableDto } from '../dto/update-timetable.dto';
import { TimetableStatus } from '../entities/timetable.entity';
import { TimetableRepository } from '../repository/timetable.repository';

@Injectable()
export class TimetableService {
  constructor(private readonly timetableRepository: TimetableRepository) {}

  async create(createTimetableDto: CreateTimetableDto) {
    return this.timetableRepository.create({
      ...createTimetableDto,
      userId: new Types.ObjectId(createTimetableDto.userId),
      status: TimetableStatus.DRAFT,
    });
  }

  async findMany(userId: string) {
    return this.timetableRepository.findMany({ userId });
  }

  async findOne(id: string) {
    const timetable = this.timetableRepository.findOne({ _id: id });

    return timetable;
  }

  generate(id: string) {
    return `This action generates a #${id} timetable`;
  }

  async update(id: string, updateTimetableDto: UpdateTimetableDto) {
    return this.timetableRepository.updateById(id, updateTimetableDto);
  }

  async remove(id: string) {
    return this.timetableRepository.deleteById(id);
  }
}
