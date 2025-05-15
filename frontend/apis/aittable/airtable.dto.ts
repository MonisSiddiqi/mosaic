export type CreateRecordDto = {
  records: [
    {
      fields: {
        name: string;
        email: string;
        userType: "Homeowner" | "Trade Professional";
        consent: "Yes" | "No";
      };
    },
  ];
};
