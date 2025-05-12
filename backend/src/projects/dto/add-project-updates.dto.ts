import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AddProjectUpdatesDto {
  @IsUUID()
  projectId: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
