import { IsString, IsStrongPassword, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  token: string;

  @IsString()
  @MinLength(8)
  @IsStrongPassword()
  password: string;
}
