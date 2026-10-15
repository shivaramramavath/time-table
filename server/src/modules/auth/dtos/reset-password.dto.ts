import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class PasswordDto {
  @ApiProperty({
    description: 'New password for the user account',
    type: String,
    minLength: 8,
    example: 'StrongPass@123',
    required: true,
  })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  password!: string;
}

export class ResetPasswordDto {
  @ApiProperty({
    description: 'New password for the user account',
    type: String,
    minLength: 8,
    example: 'StrongPass@123',
    required: true,
  })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  password!: string;

  @ApiProperty({
    description: 'ID of the user resetting their password',
    type: String,
    example: '507f1f77bcf86cd799439011',
    required: true,
  })
  @IsString({ message: 'User ID must be a string' })
  userId!: string;
}
