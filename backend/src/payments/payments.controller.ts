import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('plans')
  getAllPlans() {
    return this.paymentsService.getAllPlans();
  }

  @Post('create-checkout')
  async createCheckout(@Body() body: { planName: string; userId: string }) {
    const url = await this.paymentsService.createCheckoutSession(
      body.planName,
      body.userId,
    );
    return new ApiResponse({ url }, 'Checkout session created');
  }
}
