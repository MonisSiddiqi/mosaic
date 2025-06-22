import httpClient from "..";
import { apiEndpoints } from "../api-endpoints";
import { BidActionDto, GetAllBidsDto } from "./bids.dto";
import {
  GetAllBidsApiResponse,
  GetBidsStatisticsApiResponse,
} from "./bids.type";

export const getAllBidsApi = async (
  getAllBidsDto: GetAllBidsDto,
): Promise<GetAllBidsApiResponse> => {
  const response = await httpClient.get(apiEndpoints.bids.getAll, {
    params: getAllBidsDto,
  });

  return response.data.result;
};

export const bidActionApi = async (
  bidActionDto: BidActionDto,
): Promise<string> => {
  const response = await httpClient.post(
    apiEndpoints.bids.action,
    bidActionDto,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data.message;
};

export const getBidsStatisticsApi =
  async (): Promise<GetBidsStatisticsApiResponse> => {
    const response = await httpClient.get(apiEndpoints.bids.statistics);

    await new Promise((res, rej) =>
      setTimeout(() => {
        res("");
      }, 3000),
    );

    return response.data.result;
  };
