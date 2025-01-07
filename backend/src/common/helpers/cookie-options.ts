import { CookieOptions } from 'express-serve-static-core';

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: true,
  signed: true,
};
