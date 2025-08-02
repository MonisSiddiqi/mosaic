import { IsUUID } from 'class-validator';

export class AssignBidDto {
  @IsUUID()
  projectId: string;

  @IsUUID()
  vendorId: string;
}
