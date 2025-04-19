import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import Stripe from 'stripe';
import { addMonths } from 'date-fns';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {
    const stripeSecretKey = this.configService.get('payments.stripe.secretKey');

    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-03-31.basil',
    });
  }

  async createCheckoutSession(userId: string, planId: string) {
    const plan = await this.prismaService.plan.findUnique({
      where: { id: planId },
    });
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    const session = await this.stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: user.email,
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.id,
          quantity: 1,
        },
      ],
      metadata: { userId, planId },
      success_url: `${process.env.DOMAIN}/success`,
      cancel_url: `${process.env.DOMAIN}/cancel`,
    });

    return session;
  }

  async handleWebhook(event: Stripe.Event) {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const { userId, planId } = session.metadata;

      const startDate = new Date();
      const endDate = addMonths(startDate, 1);

      await this.prismaService.userPlan.create({
        data: {
          userId,
          planId: planId,
          paymentId: session.subscription as string,
          startDate,
          endDate,
        },
      });
    }
  }
}
