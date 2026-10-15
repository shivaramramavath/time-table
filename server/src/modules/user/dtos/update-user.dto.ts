import { ApiPropertyOptional } from '@nestjs/swagger';
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

export class UpdateUserPreferencesDto {
  @ApiPropertyOptional({
    description: 'Enable or disable dark mode',
    type: Boolean,
    example: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'darkMode must be a boolean' })
  darkMode?: boolean;
}

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Updated username',
    type: String,
    minLength: 3,
    maxLength: 20,
    example: 'shiva_ram',
  })
  @IsOptional()
  @IsString({ message: 'Username must be a string' })
  @MinLength(3, {
    message: 'Username must be at least 3 characters long',
  })
  @MaxLength(20, {
    message: 'Username cannot exceed 20 characters',
  })
  userName?: string;

  @ApiPropertyOptional({
    description: 'User preference settings',
    type: UpdateUserPreferencesDto,
    example: {
      darkMode: true,
    },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateUserPreferencesDto)
  preferences?: UpdateUserPreferencesDto;

  @ApiPropertyOptional({
    description: 'URL of the user avatar. Use null to remove the avatar.',
    type: String,
    format: 'uri',
    maxLength: 2048,
    example: 'https://example.com/avatar.png',
    nullable: true,
  })
  @IsOptional()
  @IsUrl(
    { protocols: ['http', 'https'], require_protocol: true },
    { message: 'Avatar must be a valid HTTP or HTTPS URL' },
  )
  @MaxLength(2048, {
    message: 'Avatar URL cannot exceed 2048 characters',
  })
  avatar?: string | null;
}
