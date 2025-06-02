import httpClient from "..";
import { apiEndpoints } from "../api-endpoints";
import { CreateStripeCheckoutDto } from "./payments.dto";
import {
  CreateStripeCheckoutApiResponse,
  GetAllPlansApiResponse,
  GetCurrentPlanApiResponse,
} from "./payments.type";

export const getAllPlansApi = async (): Promise<GetAllPlansApiResponse> => {
  const response = await httpClient.get(apiEndpoints.payments.getAllPlans);
  return response.data.result;
};

export const createStripeCheckoutApi = async (
  value: CreateStripeCheckoutDto,
): Promise<CreateStripeCheckoutApiResponse> => {
  const response = await httpClient.post(
    apiEndpoints.payments.stripe.createCheckout,
    value,
  );
  return response.data.result;
};

export const getCurrentPlanApi =
  async (): Promise<GetCurrentPlanApiResponse> => {
    const response = await httpClient.get(apiEndpoints.payments.currentPlan);
    return response.data.result;
  };
