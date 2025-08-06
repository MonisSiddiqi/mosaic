import { OtpType } from "./auth.type";

export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = LoginDto & {
  name: string;
  phone: string;
};

export type VendorRegisterDto = RegisterDto & {
  line1: string;
  line2?: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  lat: number;
  lng: number;
  sameAsAddress: boolean;
  serviceDistance: number;
  budgetPreference: number;

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

export type ResendOtpDto = {
  email: string;
  type: OtpType;
};

export type ForgotPasswordDto = {
  email: string;
};

export type CreatePasswordDto = {
  email: string;
  password: string;
};
