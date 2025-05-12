import { IsOptional, IsString, IsUUID } from 'class-validator';

export class EditProjectUpdateDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  description: string;
}
