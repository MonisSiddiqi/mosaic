import httpClient from "..";
import { apiEndpoints } from "../api-endpoints";
import { CreateStripeCheckoutDto } from "./payments.dto";
import {
  CreateStripeCheckoutApiResponse,
  GetAllPlansApiResponse,
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
