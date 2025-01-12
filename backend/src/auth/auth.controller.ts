import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  UnauthorizedException,
  Res,
  Delete,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Cookies } from '../common/enum/cookies.enum';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { ApiResponse } from '../common/dto/api-response.dto';
import { SignInResponse } from './types/sign-in-response.type';
import { cookieOptions } from '../common/helpers/cookie-options';
import { OAuthLoginDto } from './dto/oauth-login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @SkipAuth()
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ApiResponse<SignInResponse>> {
    const result = await this.authService.login(loginDto);

    response.cookie(Cookies.auth, result.data.access_token, cookieOptions);

    return result;
  }

  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Post('check')
  async checkSession(@Req() request: Request): Promise<ApiResponse<boolean>> {
    try {
      const accessToken = request.signedCookies[Cookies.auth];

      if (accessToken) {
        await this.jwtService.verifyAsync(accessToken, {
          ignoreExpiration: false,
        });

        return new ApiResponse<boolean>(true, 'Session is valid.');
      }
      throw new UnauthorizedException();
    } catch (e) {
      return new ApiResponse<boolean>(false, e.message);
    }
  }

  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Delete('logout')
  async logoutSession(
    @Res({ passthrough: true }) response: Response,
  ): Promise<ApiResponse<null>> {
    response.clearCookie(Cookies.auth);
    return new ApiResponse(null, 'Log-out successfully.');
  }
}
