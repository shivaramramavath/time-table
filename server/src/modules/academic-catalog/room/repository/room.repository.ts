import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AcademicCatalogRepository } from '../../common/academic-catalog.repository';
import { Room } from '../entities/room.entity';

@Injectable()
export class RoomRepository extends AcademicCatalogRepository<Room> {
  constructor(
    @InjectModel(Room.name)
    roomModel: Model<Room>,
  ) {
    super(roomModel);
  }

  findByCode(code: string) {
    return this.model.findOne({ code: code.trim().toUpperCase() }).exec();
  }
}
