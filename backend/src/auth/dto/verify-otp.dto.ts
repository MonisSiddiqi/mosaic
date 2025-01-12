import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class VerifyOtpDto {
  @IsNotEmpty()
  @Length(6, 6)
  otp: string;

  @IsEmail()
  email: string;
}
