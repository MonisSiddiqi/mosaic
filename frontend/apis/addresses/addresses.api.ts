import httpClient from "..";
import { apiEndpoints } from "../api-endpoints";
import { Address } from "./addresses.type";

export const getAddresses = async (): Promise<Address[]> => {
  const response = await httpClient.get(apiEndpoints.addresses.getAddresses);
  return response.data.result;
};
