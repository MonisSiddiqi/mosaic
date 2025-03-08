import { IsUUID } from 'class-validator';

export class AddVendorTagDto {
  @IsUUID()
  tagId: string;
}
