import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTemplateDto {
  @ApiProperty({
    description: 'MongoDB ObjectId of the user who owns this template',
    type: String,
    example: '507f1f77bcf86cd799439011',
    required: true,
  })
  @IsMongoId({ message: 'User ID must be a valid MongoDB ObjectId' })
  @IsNotEmpty({ message: 'User ID must not be empty' })
  userId!: string;

  @ApiProperty({
    description: 'Name of the timetable template',
    type: String,
    minLength: 3,
    maxLength: 100,
    example: 'Weekly Study Schedule',
    required: true,
  })
  @IsString({ message: 'Template name must be a string' })
  @IsNotEmpty({ message: 'Template name must not be empty' })
  @MinLength(3, {
    message: 'Template name must be at least 3 characters long',
  })
  @MaxLength(100, {
    message: 'Template name cannot exceed 100 characters',
  })
  name!: string;

  @ApiPropertyOptional({
    description: 'Optional description of the timetable template',
    type: String,
    maxLength: 500,
    example: 'A weekly schedule designed for exam preparation',
  })
  @IsOptional()
  @IsString({ message: 'Template description must be a string' })
  @MaxLength(500, {
    message: 'Template description cannot exceed 500 characters',
  })
  description?: string;
}
