import { Service } from "@/apis/services";

export type Plan = {
  id: string;
  name: string;
  description: string | null;
  amount: number;
  isPopular: boolean;
  productId: string;
  priceId: string;
  yearlyProductId: string;
  yearlyPriceId: string;
  updatedAt: string;
  createdAt: string;
};

export type UserPlan = {
  id: string;
  userId: string;
  planId: string;
  couponId: string | null;
  paymentId: string;
  amount: number;
  startDate: string;
  endDate: string;
  type: PlanType;
  mode: PaymentMode;
  updatedAt: string;
  createdAt: string;
};

export enum PlanType {
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}

export enum PaymentMode {
  PAID = "PAID",
  ADMIN = "ADMIN",
  TRIAL = "TRIAL",
  COUPON = "COUPON",
}

export type GetAllPlansApiResponseItem = Plan & { Service: Service[] };

export type GetAllPlansApiResponse = GetAllPlansApiResponseItem[];

export type Interval = "day" | "month" | "week" | "year";

export type CreateStripeCheckoutApiResponse = {
  url: string;
};

export type GetCurrentPlanApiResponse = UserPlan & { Plan: Plan };
