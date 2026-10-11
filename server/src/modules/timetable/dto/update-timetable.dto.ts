import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

import { TimetableStatus } from '../entities/timetable.entity';

export class UpdateTimetableDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  description?: string;

  @IsOptional()
  @IsEnum(TimetableStatus)
  status?: TimetableStatus;
}
