import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTimetableDto {
  @ApiProperty({
    description: 'ID of the user who owns the timetable',
    type: String,
    minLength: 1,
    maxLength: 100,
    example: '507f1f77bcf86cd799439011',
    required: true,
  })
  @IsString({ message: 'User ID must be a string' })
  @IsNotEmpty({ message: 'User ID must not be empty' })
  @MinLength(1, { message: 'User ID must not be empty' })
  @MaxLength(100, {
    message: 'User ID cannot exceed 100 characters',
  })
  userId!: string;

  @ApiProperty({
    description: 'Title of the timetable',
    type: String,
    minLength: 1,
    maxLength: 100,
    example: 'Weekly Study Schedule',
    required: true,
  })
  @IsString({ message: 'Timetable title must be a string' })
  @IsNotEmpty({ message: 'Timetable title must not be empty' })
  @MinLength(1, { message: 'Timetable title must not be empty' })
  @MaxLength(100, {
    message: 'Timetable title cannot exceed 100 characters',
  })
  title!: string;

  @ApiPropertyOptional({
    description: 'Optional description of the timetable',
    type: String,
    maxLength: 200,
    example: 'A weekly schedule for classes and self-study',
  })
  @IsOptional()
  @IsString({ message: 'Timetable description must be a string' })
  @MaxLength(200, {
    message: 'Timetable description cannot exceed 200 characters',
  })
  description?: string;
}
