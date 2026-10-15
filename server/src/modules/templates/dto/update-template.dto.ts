import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateTemplateDto {
  @ApiPropertyOptional({
    description: 'Updated name of the timetable template',
    type: String,
    minLength: 3,
    maxLength: 100,
    example: 'Updated Weekly Study Schedule',
  })
  @IsOptional()
  @IsString({ message: 'Template name must be a string' })
  @IsNotEmpty({ message: 'Template name must not be empty' })
  @MinLength(3, {
    message: 'Template name must be at least 3 characters long',
  })
  @MaxLength(100, {
    message: 'Template name cannot exceed 100 characters',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Updated description of the timetable template',
    type: String,
    maxLength: 500,
    example: 'A revised schedule for exam preparation',
  })
  @IsOptional()
  @IsString({ message: 'Template description must be a string' })
  @MaxLength(500, {
    message: 'Template description cannot exceed 500 characters',
  })
  description?: string;
}
