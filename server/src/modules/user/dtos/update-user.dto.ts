import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

class UpdateUserPreferencesDto {
  @IsOptional()
  @IsBoolean()
  darkMode?: boolean;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  userName?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateUserPreferencesDto)
  preferences?: UpdateUserPreferencesDto;

  @IsOptional()
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  @MaxLength(2048)
  avatar?: string | null;
}
