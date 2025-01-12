import { IsEmail, IsNotEmpty } from 'class-validator';

export class OAuthLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  name: string;
}
