import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTimetableDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  userId: string;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  description?: string;
}
