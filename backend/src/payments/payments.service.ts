import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Plan } from '@prisma/client';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService implements OnModuleInit {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  logger = new Logger(PaymentsService.name);

  onModuleInit() {
    // this.initPlans();
  }

  private stripe = new Stripe(
    'pk_live_51RJIQ302PQQN5V8Nm9oOIcgwQmFnaQU29k67jQagZMd32kWEgJUvcTyVQejitYFWH8FRSzHCi3VHhUbjkFIbeqSF00CC91kQFo',
    {
      apiVersion: '2025-04-30.basil',
    },
  );

  private prices = {};

  async initPlans() {
    const plans = await this.prismaService.plan.findMany();

    for (const plan of plans) {
      if (!plan.priceId || !plan.productId) {
        const { productId, priceId } = await this.createPlan(
          plan.name,
          plan.amount * 100,
        );

        await this.prismaService.plan.update({
          where: { id: plan.id },
          data: { productId, priceId },
        });

        this.prices[plan.name] = priceId;
      } else {
        this.prices[plan.name] = plan.priceId;
      }
    }

    this.logger.debug('Plans initialized with Stripe IDs');
  }

  private async createPlan(name: string, amount: number) {
    const product = await this.stripe.products.create({ name });
    const price = await this.stripe.prices.create({
      unit_amount: amount,
      currency: 'usd',
      recurring: { interval: 'month' },
      product: product.id,
    });
    return { productId: product.id, priceId: price.id };
  }

  async createCheckoutSession(planName: string, userId: string) {
    const priceId = this.prices[planName];
    if (!priceId) {
      throw new Error(`Plan "${planName}" not initialized.`);
    }

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `http://localhost:3000/success?plan=${planName}`,
      cancel_url: `http://localhost:3000/membership`,
      metadata: {
        userId,
        planName,
      },
    });

    return session.url;
  }

  async getAllPlans() {
    const plans = await this.prismaService.plan.findMany({
      include: {
        Service: true,
      },
      orderBy: {
        amount: 'asc',
      },
    });

    return new ApiResponse(plans, 'Plans fetched successfullly');
  }
}
