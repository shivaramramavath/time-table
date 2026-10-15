import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'Email address registered with the application',
    type: String,
    format: 'email',
    example: 'user@example.com',
    required: true,
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email must not be empty' })
  email!: string;

  @ApiProperty({
    description: 'Account password (8–72 characters)',
    type: String,
    minLength: 8,
    maxLength: 72,
    format: 'password',
    example: 'StrongPass@123',
    required: true,
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password must not be empty' })
  @Length(8, 72, {
    message: 'Password must be between 8 and 72 characters long',
  })
  password!: string;
}
