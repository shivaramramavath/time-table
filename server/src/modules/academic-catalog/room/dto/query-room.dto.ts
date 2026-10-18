import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

import {
  ROOM_STATUSES,
  ROOM_TYPES,
  type RoomStatus,
  type RoomType,
} from '../entities/room.entity';

const ROOM_SORT_FIELDS = [
  'name',
  'code',
  'type',
  'capacity',
  'building',
  'floor',
  'status',
  'createdAt',
  'updatedAt',
] as const;

export class RoomQueryDto {
  @ApiPropertyOptional({
    description: 'Page number',
    example: 1,
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @ApiPropertyOptional({
    description: 'Number of rooms per page (maximum 100)',
    example: 20,
    minimum: 1,
    maximum: 100,
    default: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit = 20;

  @ApiPropertyOptional({
    description: 'Field used to sort the results',
    enum: ROOM_SORT_FIELDS,
    default: 'createdAt',
  })
  @IsOptional()
  @IsIn(ROOM_SORT_FIELDS)
  sortBy: (typeof ROOM_SORT_FIELDS)[number] = 'createdAt';

  @ApiPropertyOptional({
    description: 'Sort direction',
    enum: ['asc', 'desc'],
    default: 'desc',
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order: 'asc' | 'desc' = 'desc';

  @ApiPropertyOptional({
    description: 'Search by room name or code',
    example: 'LAB-101',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter by room type',
    enum: ROOM_TYPES,
    example: 'lab',
  })
  @IsOptional()
  @IsEnum(ROOM_TYPES)
  type?: RoomType;

  @ApiPropertyOptional({
    description: 'Filter by room availability status',
    enum: ROOM_STATUSES,
    example: 'available',
  })
  @IsOptional()
  @IsEnum(ROOM_STATUSES)
  status?: RoomStatus;

  @ApiPropertyOptional({
    description: 'Filter rooms with at least this capacity',
    example: 30,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  minCapacity?: number;

  @ApiPropertyOptional({
    description: 'Filter rooms with at most this capacity',
    example: 100,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  maxCapacity?: number;

  @ApiPropertyOptional({
    description: 'Filter by building name',
    example: 'Block A',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  building?: string;
}
