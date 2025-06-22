import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { LoginDto } from './login.dto';

export class RegisterDto extends LoginDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @Matches(/^\+[1-9]\d{1,14}$/, {
    message: 'Phone number must be in E.164 format (e.g., +1234567890)',
    context: {
      errorCode: 'invalid_phone_format',
    },
  })
  phone?: string;
}
