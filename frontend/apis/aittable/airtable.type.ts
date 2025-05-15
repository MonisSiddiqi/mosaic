export type Record = {
  id: string;
  createdTime: string;
  fields: {
    name: string;
    email: string;
    consent: string;
    userType: string;
  };
};

export type CreateAirtableRecordApiResponse = {
  records: Record[];
};

export type GetAirtableRecordsApiResponse = CreateAirtableRecordApiResponse;
