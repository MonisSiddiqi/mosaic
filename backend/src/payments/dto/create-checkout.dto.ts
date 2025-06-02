import { IsIn, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Interval } from '../services/stripe.service';

export class CreateCheckoutDto {
  @IsString()
  @IsNotEmpty()
  planName: string;

  @IsUUID()
  userId: string;

  @IsIn(['day', 'month', 'week', 'year'])
  interval: Interval;
}
