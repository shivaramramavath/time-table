import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

import {
  ROOM_STATUSES,
  ROOM_TYPES,
  type RoomStatus,
  type RoomType,
} from '../entities/room.entity';

export class CreateRoomDto {
  @ApiProperty({
    description: 'Name of the room',
    example: 'Computer Lab 1',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @ApiProperty({
    description: 'Unique room code',
    example: 'LAB-101',
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  code!: string;

  @ApiProperty({
    description: 'Type of room',
    enum: ROOM_TYPES,
    example: 'lab',
  })
  @IsEnum(ROOM_TYPES)
  type!: RoomType;

  @ApiProperty({
    description: 'Maximum number of people the room can accommodate',
    example: 60,
    minimum: 1,
    type: Number,
  })
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @Min(1)
  capacity!: number;

  @ApiPropertyOptional({
    description: 'Building where the room is located',
    example: 'Block A',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  building?: string;

  @ApiPropertyOptional({
    description: 'Floor number of the room',
    example: 1,
    minimum: 0,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  floor?: number;

  @ApiPropertyOptional({
    description: 'Facilities available in the room',
    example: ['Projector', 'Air Conditioning', 'Whiteboard'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  facilities?: string[];

  @ApiPropertyOptional({
    description: 'Current availability status of the room',
    enum: ROOM_STATUSES,
    example: 'available',
    default: 'available',
  })
  @IsOptional()
  @IsEnum(ROOM_STATUSES)
  status?: RoomStatus;
}
