import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    description: 'Unique username for the account',
    type: String,
    minLength: 3,
    maxLength: 20,
    example: 'shiva_ram',
    required: true,
  })
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username must not be empty' })
  @Length(3, 20, {
    message: 'Username must be between 3 and 20 characters',
  })
  userName!: string;

  @ApiProperty({
    description: 'Email address for the new account',
    type: String,
    format: 'email',
    example: 'shiva@example.com',
    required: true,
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email must not be empty' })
  email!: string;

  @ApiProperty({
    description: 'Password for the new account',
    type: String,
    format: 'password',
    minLength: 8,
    maxLength: 72,
    example: 'StrongPass@123',
    required: true,
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password must not be empty' })
  @Length(8, 72, {
    message: 'Password must be between 8 and 72 characters',
  })
  password!: string;
}
