import {
  Injectable,
  Logger,
  OnModuleInit,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import Stripe from 'stripe';
import { Request } from 'express';
import { CreateCheckoutDto } from '../dto/create-checkout.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';

export type Interval = 'day' | 'month' | 'week' | 'year';

@Injectable()
export class StripeService implements OnModuleInit {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  private stripe = new Stripe(
    this.configService.get('payments.stripe.secretKey'),
    { apiVersion: '2025-03-31.basil' },
  );

  private prices = {};

  logger = new Logger(StripeService.name);

  onModuleInit() {
    this.initPlans();
  }

  async initPlans() {
    const plans = await this.prismaService.plan.findMany();

    for (const plan of plans) {
      if (!plan.priceId || !plan.productId) {
        const { productId, priceId } = await this.createPlan(
          plan.name,
          plan.amount * 100,
          'month',
        );

        await this.prismaService.plan.update({
          where: { id: plan.id },
          data: { productId, priceId },
        });

        this.prices[plan.name] = { monthly: priceId };
      } else {
        this.prices[plan.name] = { monthly: plan.priceId };
      }

      //yearly
      if (!plan.yearlyPriceId || !plan.yearlyProductId) {
        const { productId, priceId } = await this.createPlan(
          plan.name,
          plan.amount * 100 * 10,
          'year',
        );

        await this.prismaService.plan.update({
          where: { id: plan.id },
          data: { yearlyPriceId: priceId, yearlyProductId: productId },
        });

        this.prices[plan.name] = { ...this.prices[plan.name], yearly: priceId };
      } else {
        this.prices[plan.name] = {
          ...this.prices[plan.name],
          yearly: plan.yearlyPriceId,
        };
      }
    }

    this.logger.debug('Plans initialized with Stripe IDs');
    console.log(this.prices);
  }

  private async createPlan(name: string, amount: number, interval: Interval) {
    const product = await this.stripe.products.create({ name });
    const price = await this.stripe.prices.create({
      unit_amount: amount,
      currency: 'usd',
      recurring: { interval },
      product: product.id,
    });
    return { productId: product.id, priceId: price.id };
  }

  async createCheckoutSession(createCheckoutDto: CreateCheckoutDto) {
    const { planName, userId, interval } = createCheckoutDto;
    const plan = this.prices[planName];

    let priceId;

    if (interval === 'month') {
      priceId = plan?.monthly;
    } else if (interval === 'year') {
      priceId = plan?.yearly;
    }

    if (!priceId) {
      throw new Error(`Plan "${planName}" not initialized.`);
    }

    const frontendUrl = this.configService.get('frontendUrl');

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${frontendUrl}/success?plan=${planName}`,
      cancel_url: `${frontendUrl}/dashboard/membership`,
      metadata: {
        userId,
        planName,
        interval,
      },
    });

    return new ApiResponse({ url: session.url }, 'Checkout session created');
  }

  async handleWebhook(req: Request) {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = this.configService.get(
      'payments.stripe.webhookSecret',
    );

    let event;

    try {
      event = this.stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      throw new Error(
        `Webhook signature verification failed: ${(err as Error).message}`,
      );
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.metadata.userId;
      const planName = session.metadata.planName;
      const interval = session.metadata.interval;

      const plan = await this.prismaService.plan.findFirst({
        where: { name: planName },
      });
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
      });

      if (!plan) {
        throw new UnprocessableEntityException('Invalid plan');
      }
      if (!user) {
        throw new UnprocessableEntityException('User not found');
      }

      await this.prismaService.userPlan.create({
        data: {
          userId: user.id,
          planId: plan.id,
          startDate: '',
          endDate: '',
          type: interval === 'year' ? 'YEARLY' : 'MONTHLY',
          paymentId: '',
          mode: 'PAID',
          amount: plan.amount,
        },
      });

      this.logger.debug(
        `User ${userId} subscribed to ${planName} (${interval})`,
      );
    }
  }
}
