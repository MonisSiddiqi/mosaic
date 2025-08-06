export type Address = {
  id: string;
  userId: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  lat: number;
  lng: number;
  updatedAt: string;
  createdAt: string;
};
