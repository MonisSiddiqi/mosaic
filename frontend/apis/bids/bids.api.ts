import httpClient from "..";
import { apiEndpoints } from "../api-endpoints";
import { GetAllBidsDto } from "./bids.dto";
import { GetAllBidsApiResponse } from "./bids.type";

export const getAllBidsApi = async (
  getAllBidsDto: GetAllBidsDto,
): Promise<GetAllBidsApiResponse> => {
  const response = await httpClient.get(apiEndpoints.bids.getAll, {
    params: getAllBidsDto,
  });

  return response.data.result;
};
