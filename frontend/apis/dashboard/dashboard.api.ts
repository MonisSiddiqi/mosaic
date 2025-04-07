import httpClient from "..";
import { apiEndpoints } from "../api-endpoints";

type GetDashboardDataApiResponse = {
  homeOwners: number;
  vendors: number;
  projects: number;
  openBids: number;
};

export const getDashboardDataApi =
  async (): Promise<GetDashboardDataApiResponse> => {
    const response = await httpClient.get(apiEndpoints.dashboard.getData);

    return response.data.result;
  };
