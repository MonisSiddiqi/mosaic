import { IsEmail, IsString, Length } from 'class-validator';

export class CreateNewPasswordDto {
  @IsString()
  @Length(6)
  password: string;

  @IsEmail()
  email: string;
}
