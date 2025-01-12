import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @Length(8)
  @IsString()
  password: string;
}
