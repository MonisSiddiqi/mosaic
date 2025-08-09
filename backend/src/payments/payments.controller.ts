import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  Param,
  Post,
  RawBody,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { Response } from 'express';
import { StripeService } from './services/stripe.service';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User, UserRole } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { SkipAuth } from 'src/auth/decorators/skip-auth.decorator';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly stripeService: StripeService,
  ) {}

  @Get('plans')
  getAllPlans() {
    return this.paymentsService.getAllPlans();
  }

  @Post('create-checkout')
  createCheckout(@Body() createCheckoutDto: CreateCheckoutDto) {
    return this.stripeService.createCheckoutSession(createCheckoutDto);
  }

  @Roles(UserRole.VENDOR)
  @UseGuards(RolesGuard)
  @Get('current-plan')
  getCurrentPlan(@GetUser() authUser: User) {
    return this.paymentsService.currentPlan(authUser);
  }

  @Post('update-session/:sessionId')
  @Roles(UserRole.VENDOR)
  @UseGuards(RolesGuard)
  updateSession(@Param('sessionId') sessionId: string) {
    return this.stripeService.updateSession(sessionId);
  }

  @SkipAuth()
  @Post('stripe-webhook')
  @Header('Content-Type', 'application/json')
  async handleStripeWebhook(
    @RawBody() rawBody: Buffer,
    @Headers('stripe-signature') signature: string,
    @Res() res: Response,
  ) {
    try {
      console.log('Received Stripe webhook');
      await this.stripeService.handleWebhook(rawBody, signature);
      res.status(200).send('Webhook received');
    } catch (err) {
      res.status(400).send(`Webhook Error: ${(err as Error).message}`);
    }
  }
}
