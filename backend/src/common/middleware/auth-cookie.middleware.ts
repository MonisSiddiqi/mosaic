import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { Cookies } from '../enum/cookies.enum';

@Injectable()
export class AuthCookieMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    const accessToken = req.signedCookies[Cookies.auth];

    if (accessToken) {
      req.headers['authorization'] = `Bearer ${accessToken}`;
    }

    next();
  }
}
