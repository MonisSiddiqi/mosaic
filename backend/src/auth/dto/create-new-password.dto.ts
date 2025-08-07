import { Transform } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateNewPasswordDto {
  @IsString()
  @Length(6)
  password: string;

  @IsEmail()
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;
}
