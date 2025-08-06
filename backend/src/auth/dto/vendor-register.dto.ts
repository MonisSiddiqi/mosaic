import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { RegisterDto } from './register.dto';
import { Transform } from 'class-transformer';

export class VendorRegisterDto extends RegisterDto {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  serviceDistance: number;

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
  @IsNumber({ allowNaN: false })
  lat: number;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  lng: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  budgetPreference: number;

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

  @ValidateIf((data) => data.sameAsAddress === false)
  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  officeLat: number;

  @ValidateIf((data) => data.sameAsAddress === false)
  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  officelng: number;
}
