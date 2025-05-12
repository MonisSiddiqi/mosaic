import { Interval } from "@/apis/payments";

export type CreateStripeCheckoutDto = {
  planName: string;
  userId: string;
  interval: Interval;
};
