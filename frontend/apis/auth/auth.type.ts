export type LoginResponse = {
  token_type: string;
  access_token: string;
};

export enum OtpType {
  REGISTRATION,
  FORGOT_PASSWORD,
}
