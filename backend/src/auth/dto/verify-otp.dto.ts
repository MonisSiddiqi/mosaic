import { OtpType } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';

export class VerifyOtpDto {
  @IsNotEmpty()
  @Length(6, 6)
  otp: string;

  @IsEmail()
  email: string;

  @IsEnum(OtpType, {
    message: `Invalid otp type must be one of the : ${Object.keys(OtpType).join(',')}`,
  })
  type: OtpType;
}
