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
  Patch,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
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
import { RegisterDto } from './dto/register.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { CreateNewPasswordDto } from './dto/create-new-password.dto';
import { VendorRegisterDto } from './dto/vendor-register.dto';
import { ResendOtpDto } from './dto/resend-otp.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  @SkipAuth()
  @UseInterceptors(FileInterceptor('file'))
  register(
    @Body() registerDto: RegisterDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5 MB limit
          new FileTypeValidator({ fileType: /^image\/.*/ }), // only images
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<ApiResponse<SignInResponse>> {
    return this.authService.register(registerDto, file);
  }

  @Post('vendor-register')
  @SkipAuth()
  @UseInterceptors(FileInterceptor('file'))
  vendorRegister(
    @Body() vendorRegisterDto: VendorRegisterDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5 MB limit
          new FileTypeValidator({ fileType: /^image\/.*/ }), // only images
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<ApiResponse<SignInResponse>> {
    return this.authService.vendorRegister(vendorRegisterDto, file);
  }

  @Post('verify-otp')
  @SkipAuth()
  async verifyOtp(
    @Body() verifyOtpDto: VerifyOtpDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ApiResponse<SignInResponse>> {
    const result =
      verifyOtpDto.type === 'REGISTRATION'
        ? await this.authService.verifyOtp(verifyOtpDto)
        : await this.authService.verifyForgotPasswordOtp(verifyOtpDto);

    if (verifyOtpDto.type === 'REGISTRATION') {
      response.cookie(Cookies.auth, result.data.access_token, cookieOptions);
    }

    return result;
  }

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

  @Post('forgot-password')
  @SkipAuth()
  forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<ApiResponse> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('create-password')
  @SkipAuth()
  createNewPassword(
    @Body() createNewPasswordDto: CreateNewPasswordDto,
  ): Promise<ApiResponse> {
    return this.authService.createNewPassword(createNewPasswordDto);
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

  @SkipAuth()
  @Patch('resend-otp')
  resendOtp(@Body() resendOtpDto: ResendOtpDto): Promise<ApiResponse> {
    return this.authService.resendOtp(resendOtpDto);
  }
}
