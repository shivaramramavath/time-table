import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

import { TimetableStatus } from '../entities/timetable.entity';

export class UpdateTimetableDto {
  @ApiPropertyOptional({
    description: 'Updated title of the timetable',
    type: String,
    maxLength: 100,
    example: 'Updated Weekly Study Schedule',
  })
  @IsOptional()
  @IsString({ message: 'Timetable title must be a string' })
  @MaxLength(100, {
    message: 'Timetable title cannot exceed 100 characters',
  })
  title?: string;

  @ApiPropertyOptional({
    description: 'Updated description of the timetable',
    type: String,
    maxLength: 200,
    example: 'Revised schedule for classes and self-study',
  })
  @IsOptional()
  @IsString({ message: 'Timetable description must be a string' })
  @MaxLength(200, {
    message: 'Timetable description cannot exceed 200 characters',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Current status of the timetable',
    enum: TimetableStatus,
    enumName: 'TimetableStatus',
    example: Object.values(TimetableStatus)[0],
  })
  @IsOptional()
  @IsEnum(TimetableStatus, {
    message: 'Status must be a valid timetable status',
  })
  status?: TimetableStatus;
}
