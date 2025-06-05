import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { RegisterDto } from './register.dto';
import { Transform } from 'class-transformer';

export class VendorRegisterDto extends RegisterDto {
  @IsNotEmpty()
  @IsString()
  line1: string;

  @IsOptional()
  @IsString()
  line2: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @IsNotEmpty()
  @Transform(({ value }) => {
    if (value === true || value === 'true') {
      return true;
    } else if (value === false || value === 'false') {
      return false;
    } else {
      return false;
    }
  })
  @IsBoolean()
  sameAsAddress: boolean;

  @ValidateIf((data) => data.sameAsAddress === false)
  @IsNotEmpty()
  @IsString()
  officeLine1: string;

  @ValidateIf((data) => data.sameAsAddress === false)
  @IsOptional()
  @IsString()
  officeLine2: string;

  @ValidateIf((data) => data.sameAsAddress === false)
  @IsNotEmpty()
  @IsString()
  officeCountry: string;

  @ValidateIf((data) => data.sameAsAddress === false)
  @IsNotEmpty()
  @IsString()
  officeState: string;

  @ValidateIf((data) => data.sameAsAddress === false)
  @IsNotEmpty()
  @IsString()
  officeCity: string;

  @ValidateIf((data) => data.sameAsAddress === false)
  @IsNotEmpty()
  @IsString()
  officePostalCode: string;
}
