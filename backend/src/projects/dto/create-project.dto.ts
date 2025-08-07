import { Unit } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  serviceId: string;

  @IsNumber()
  @Transform(({ value }) => +value)
  @Min(0)
  budgetPreference?: number = 5;

  @IsOptional()
  @IsString()
  preferenceMessage?: string;

  @IsOptional()
  @IsString()
  siteDescription?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags: string[];

  //Address

  @IsNotEmpty()
  @IsString()
  line1: string;

  @IsOptional()
  @IsString()
  line2?: string;

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
  @Transform(({ value }) => parseFloat(value))
  @IsNumber({ allowNaN: false })
  lat: number;

  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber({ allowNaN: false })
  lng: number;

  //site measurements

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value), {
    toClassOnly: true,
  })
  length?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value), {
    toClassOnly: true,
  })
  width?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value), {
    toClassOnly: true,
  })
  height?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value), {
    toClassOnly: true,
  })
  area?: number;

  @IsOptional()
  @IsEnum(Unit)
  unit: Unit = Unit.METER;
}
