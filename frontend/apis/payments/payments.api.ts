import httpClient from "..";
import { apiEndpoints } from "../api-endpoints";
import { GetAllPlansApiResponse } from "./payments.type";

export const getAllPlansApi = async (): Promise<GetAllPlansApiResponse> => {
  const response = await httpClient.get(apiEndpoints.payments.getAllPlans);
  return response.data.result;
};
