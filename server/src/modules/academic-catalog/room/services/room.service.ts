import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Types, type QueryFilter, type SortOrder } from 'mongoose';

import { AcademicCatalogService } from '../../common/academic-catalog.service';
import { CreateRoomDto } from '../dto/create-room.dto';
import { RoomQueryDto } from '../dto/query-room.dto';
import { UpdateRoomDto } from '../dto/update-room.dto';
import { Room } from '../entities/room.entity';
import { RoomRepository } from '../repository/room.repository';

@Injectable()
export class RoomService extends AcademicCatalogService<Room> {
  constructor(private readonly roomRepository: RoomRepository) {
    super(roomRepository);
  }

  async create(userId: string, createRoomDto: CreateRoomDto) {
    const code = createRoomDto.code.trim().toUpperCase();

    const existingRoom = await this.roomRepository.findByCode(code);

    if (existingRoom) {
      throw new ConflictException(`Room with code "${code}" already exists`);
    }

    return this.roomRepository.create({
      ...createRoomDto,
      code,
      userId: new Types.ObjectId(userId),
    });
  }

  async getAll(query: RoomQueryDto) {
    const {
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      order = 'desc',
      search,
      type,
      status,
      minCapacity,
      maxCapacity,
      building,
    } = query;

    if (
      minCapacity !== undefined &&
      maxCapacity !== undefined &&
      minCapacity > maxCapacity
    ) {
      throw new BadRequestException(
        'minCapacity cannot be greater than maxCapacity',
      );
    }

    const filter: QueryFilter<Room> = {};

    if (type) {
      filter.type = type;
    }

    if (status) {
      filter.status = status;
    }

    if (building) {
      filter.building = building;
    }

    if (minCapacity !== undefined || maxCapacity !== undefined) {
      filter.capacity = {
        ...(minCapacity !== undefined && {
          $gte: minCapacity,
        }),
        ...(maxCapacity !== undefined && {
          $lte: maxCapacity,
        }),
      };
    }

    if (search) {
      // Escape regex metacharacters so search is treated as literal text.
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      const searchRegex = new RegExp(escapedSearch, 'i');

      filter.$or = [{ name: searchRegex }, { code: searchRegex }];
    }

    const sort: Record<string, SortOrder> = {
      [sortBy]: order === 'asc' ? 1 : -1,
      _id: 1,
    };

    return this.roomRepository.findMany(filter, page, sort, limit);
  }

  async update(roomId: string, updateRoomDto: UpdateRoomDto) {
    if (updateRoomDto.code !== undefined) {
      const code = updateRoomDto.code.trim().toUpperCase();

      const existingRoom = await this.roomRepository.findByCode(code);

      if (existingRoom && existingRoom._id.toString() !== roomId) {
        throw new ConflictException(`Room with code "${code}" already exists`);
      }

      return super.update(roomId, {
        ...updateRoomDto,
        code,
      });
    }

    return super.update(roomId, updateRoomDto);
  }
}
