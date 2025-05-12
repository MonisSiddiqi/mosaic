import { IsIn, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Interval } from '../payments.service';

export class CreateCheckoutDto {
  @IsString()
  @IsNotEmpty()
  planName: string;

  @IsUUID()
  userId: string;

  @IsIn(['day', 'month', 'week', 'year'])
  interval: Interval;
}
