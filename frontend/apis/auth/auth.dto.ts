import { OtpType } from "./auth.type";

export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = LoginDto & {
  name: string;
};

export type VendorRegisterDto = RegisterDto & {
  line1: string;
  line2?: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  sameAsAddress: boolean;

  // These fields are required only if sameAsAddress is false
  officeLine1?: string;
  officeLine2?: string;
  officeCountry?: string;
  officeState?: string;
  officeCity?: string;
  officePostalCode?: string;
};

export type VerifyOtpDto = {
  email: string;
  otp: string;
  type: OtpType;
};
