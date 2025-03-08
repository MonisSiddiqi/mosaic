import { IsUUID } from 'class-validator';

export class AddVendorServiceDto {
  @IsUUID()
  serviceId: string;
}
