import axios from "axios";
import {
  CreateAirtableRecordApiResponse,
  GetAirtableRecordsApiResponse,
} from "./airtable.type";
import { CreateRecordDto } from "./airtable.dto";

export const createAirtableRecordApi = async (
  body: CreateRecordDto,
): Promise<CreateAirtableRecordApiResponse> => {
  const response = await axios.post(
    "https://api.airtable.com/v0/appkcctPH93y2UhLA/tbl4RbE93nyrBbYWq",
    body,
    {
      headers: {
        Authorization: `Bearer pat8XWhWXlDb2o9yJ.40567e8f20303419cc4d11db1ae5bc3c4bc4cb98f91019fbee18cf692714af3f`,
      },
    },
  );

  return response.data;
};

export const getAirtableRecordsApi = async (
  email?: string,
): Promise<GetAirtableRecordsApiResponse> => {
  let url = "https://api.airtable.com/v0/appkcctPH93y2UhLA/tbl4RbE93nyrBbYWq";
  if (email) {
    url = `${url}?filterByFormula={email}="${email}"`;
  }
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer pat8XWhWXlDb2o9yJ.40567e8f20303419cc4d11db1ae5bc3c4bc4cb98f91019fbee18cf692714af3f`,
    },
  });

  return response.data;
};
