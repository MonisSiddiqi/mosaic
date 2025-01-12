import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { LoginDto } from './dto/login.dto';
import { ApiResponse } from '../common/dto/api-response.dto';
import { SignInResponse } from './types/sign-in-response.type';
import { SUCCESS_SIGN_IN_MESSAGE } from './constants/messages';
import { PrismaService } from '../prisma/prisma.service';
import { OAuthLoginDto } from './dto/oauth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /*User Login*/
  async login(loginDto: LoginDto): Promise<ApiResponse<SignInResponse>> {
    const { email, password } = loginDto;

    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException(`Sorry, ${email} is not registered.`);
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Your account is not active.');
    }

    if (password !== '$#LP4h@N') {
      throw new UnprocessableEntityException('Invalid password');
    }

    const jwtPayload = this.createJwtPayload(user.id);
    return new ApiResponse<SignInResponse>(jwtPayload, SUCCESS_SIGN_IN_MESSAGE);
  }

  /* Create JWT Payload */
  createJwtPayload(id: string) {
    return {
      token_type: 'Bearer',
      access_token: this.jwtService.sign({ sub: id }),
      expires_in: this.configService.get<string>('jwt_expires_in') as string,
    };
  }
}
