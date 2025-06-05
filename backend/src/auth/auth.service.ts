import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ApiResponse } from '../common/dto/api-response.dto';
import { SignInResponse } from './types/sign-in-response.type';
import { SUCCESS_SIGN_IN_MESSAGE } from './constants/messages';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { CreateNewPasswordDto } from './dto/create-new-password.dto';
import { MailService } from 'src/mail/mail.service';
import { Prisma } from '@prisma/client';
import { VendorRegisterDto } from './dto/vendor-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  logger = new Logger(AuthService.name);

  async register(registerDto: RegisterDto): Promise<ApiResponse> {
    const { name, email, password } = registerDto;

    const isExist = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      include: {
        Otp: true,
      },
    });

    if (isExist && isExist.isEmailVerified) {
      throw new UnprocessableEntityException(
        `User with email has (${email}) already registered.`,
      );
    }

    //create otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await this.prismaService.user.upsert({
      where: {
        email,
      },
      update: {
        password: await this.createPassword(password),
        UserProfile: {
          update: {
            name,
          },
        },
      },
      create: {
        email,
        password: await this.createPassword(password),
        UserProfile: {
          create: {
            name,
          },
        },
      },
    });

    await this.prismaService.otp.upsert({
      where: {
        userId: user.id,
        type: 'REGISTRATION',
      },
      update: {
        oneTimePassword: await this.createPassword(otp),
      },
      create: {
        type: 'REGISTRATION',
        userId: user.id,
        oneTimePassword: await this.createPassword(otp),
      },
    });

    try {
      await this.mailService.sendRegisterOtpMail(email, name, otp);
    } catch (err) {
      this.logger.debug(otp);
      this.logger.error(
        err instanceof Error ? err.message : 'Could not send otp',
      );
    }

    return new ApiResponse(null, `OTP Sent successfully to (${user.email})`);
  }

  async vendorRegister(
    vendorRegisterDto: VendorRegisterDto,
  ): Promise<ApiResponse> {
    const {
      name,
      email,
      password,
      line1,
      line2,
      country,
      state,
      city,
      postalCode,
      sameAsAddress,
      officeLine1,
      officeLine2,
      officeCountry,
      officeState,
      officeCity,
      officePostalCode,
    } = vendorRegisterDto;

    const isExist = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      include: {
        Otp: true,
      },
    });

    if (isExist && isExist.isEmailVerified) {
      throw new UnprocessableEntityException(
        `User with email has (${email}) already registered.`,
      );
    }

    //create otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await this.prismaService.user.upsert({
      where: {
        email,
      },
      update: {
        password: await this.createPassword(password),
        role: 'VENDOR',
        UserProfile: {
          update: {
            name,
          },
        },
        Address: {
          create: {
            line1,
            line2,
            country,
            state,
            city,
            postalCode,
          },
        },

        ...(sameAsAddress
          ? {
              sameAsAddress,
            }
          : {
              BusinessAddress: {
                create: {
                  line1: officeLine1,
                  line2: officeLine2,
                  country: officeCountry,
                  state: officeState,
                  city: officeCity,
                  postalCode: officePostalCode,
                },
              },
            }),
      },
      create: {
        email,
        password: await this.createPassword(password),
        role: 'VENDOR',
        UserProfile: {
          create: {
            name,
          },
        },
        Address: {
          create: {
            line1,
            line2,
            country,
            state,
            city,
            postalCode,
          },
        },

        ...(sameAsAddress
          ? {
              sameAsAddress,
            }
          : {
              BusinessAddress: {
                create: {
                  line1: officeLine1,
                  line2: officeLine2,
                  country: officeCountry,
                  state: officeState,
                  city: officeCity,
                  postalCode: officePostalCode,
                },
              },
            }),
      },
    });

    await this.prismaService.otp.upsert({
      where: {
        userId: user.id,
        type: 'REGISTRATION',
      },
      update: {
        oneTimePassword: await this.createPassword(otp),
      },
      create: {
        type: 'REGISTRATION',
        userId: user.id,
        oneTimePassword: await this.createPassword(otp),
      },
    });

    try {
      await this.mailService.sendRegisterOtpMail(email, name, otp);
    } catch (err) {
      this.logger.debug(otp);
      this.logger.error(
        err instanceof Error ? err.message : 'Could not send otp',
      );
    }

    return new ApiResponse(null, `OTP Sent successfully to (${user.email})`);
  }

  //verify otp
  async verifyOtp(
    verifyOtpDto: VerifyOtpDto,
  ): Promise<ApiResponse<SignInResponse>> {
    const { otp, email } = verifyOtpDto;

    //is user exist
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    //is user already verified
    if (user.isEmailVerified) {
      throw new UnprocessableEntityException('User already registered');
    }

    const otpTable = await this.prismaService.otp.findFirst({
      where: {
        userId: user.id,
        type: 'REGISTRATION',
      },
    });

    //is otp table present
    if (!otpTable) {
      throw new UnprocessableEntityException(
        'No otp is associated with this user',
      );
    }

    //is otp match
    const isOtpMatch = await bcrypt.compare(otp, otpTable.oneTimePassword);

    if (!isOtpMatch) {
      throw new UnprocessableEntityException(`OTP does not match`);
    }

    await this.prismaService.user.update({
      where: {
        email,
      },
      data: {
        isEmailVerified: true,
      },
    });

    await this.prismaService.otp.delete({
      where: {
        userId: user.id,
        type: 'REGISTRATION',
      },
    });
    const jwtPayload = this.createJwtPayload(user.id);
    return new ApiResponse(jwtPayload, 'OTP Verified, Registration successful');
  }

  //login service
  async login(loginDto: LoginDto): Promise<ApiResponse<SignInResponse>> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!user || !user.isEmailVerified) {
      throw new UnauthorizedException(
        'Sorry, your email is not registered. Please register yourself',
      );
    }

    const loginHistoryInput: Prisma.LoginHistoryCreateInput = {
      user: {
        connect: {
          id: user.id,
        },
      },
    };

    if (!user.isActive) {
      await this.prismaService.loginHistory.create({
        data: {
          ...loginHistoryInput,
          status: false,
          message: 'Account is not active',
        },
      });

      throw new UnauthorizedException('Your account is not active');
    }

    const isPasswordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordMatch) {
      await this.prismaService.loginHistory.create({
        data: {
          ...loginHistoryInput,
          status: false,
          message: 'Invalid Password',
        },
      });
      throw new UnauthorizedException('Invalid Password.');
    }

    const jwtPayload = this.createJwtPayload(user.id);

    await this.prismaService.loginHistory.create({
      data: {
        ...loginHistoryInput,
        status: true,
        message: 'Login Successfully',
      },
    });

    return new ApiResponse<SignInResponse>(jwtPayload, SUCCESS_SIGN_IN_MESSAGE);
  }

  //forgot password
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
        isEmailVerified: true,
      },
      include: {
        UserProfile: true,
      },
    });
    if (!user) {
      throw new UnprocessableEntityException('User not found');
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    console.log(otp);

    await this.prismaService.otp.upsert({
      where: {
        userId: user.id,
        type: 'FORGOT_PASSWORD',
      },
      update: {
        oneTimePassword: await this.createPassword(otp),
      },
      create: {
        oneTimePassword: await this.createPassword(otp),
        type: 'FORGOT_PASSWORD',
        userId: user.id,
      },
    });

    //send mail
    try {
      await this.mailService.sendForgotPasswordMail(
        email,
        user.UserProfile.name,
        otp,
      );
    } catch (err) {
      this.logger.log(otp);
      this.logger.error(
        err instanceof Error ? err.message : 'Could not send otp',
      );
    }

    return new ApiResponse(
      null,
      `OTP has been sent successfully to (${email})`,
    );
  }

  async verifyForgotPasswordOtp(verifyOtpDto: VerifyOtpDto) {
    const { otp, email } = verifyOtpDto;
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new UnprocessableEntityException('User not found');
    }

    const otpTable = await this.prismaService.otp.findFirst({
      where: {
        userId: user.id,
        type: 'FORGOT_PASSWORD',
      },
    });
    if (!otpTable) {
      throw new UnprocessableEntityException(
        'No otp associated with this user',
      );
    }

    const isOtpMatch = await bcrypt.compare(otp, otpTable.oneTimePassword);
    if (!isOtpMatch) {
      throw new UnprocessableEntityException(`OTP does not match`);
    }
    await this.prismaService.otp.update({
      where: {
        userId: user.id,
        type: 'FORGOT_PASSWORD',
      },
      data: {
        isVerified: true,
      },
    });
    return new ApiResponse(null, 'OTP verified successfully');
  }

  async createNewPassword(createNewPasswordDto: CreateNewPasswordDto) {
    const { password, email } = createNewPasswordDto;
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new UnprocessableEntityException('User not found');
    }

    const otpTable = await this.prismaService.otp.findFirst({
      where: {
        userId: user.id,
        type: 'FORGOT_PASSWORD',
      },
    });
    if (!otpTable) {
      throw new UnprocessableEntityException(
        'No otp associated with this user',
      );
    }

    if (!otpTable.isVerified) {
      throw new UnprocessableEntityException('OTP is not verified');
    }

    await this.prismaService.user.update({
      where: {
        email,
      },
      data: {
        password: await this.createPassword(password),
      },
    });

    await this.prismaService.otp.delete({
      where: {
        userId: user.id,
        type: 'FORGOT_PASSWORD',
      },
    });

    return new ApiResponse(null, 'Password updated successfully');
  }

  private async createPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  private createJwtPayload(id: string) {
    return {
      token_type: 'Bearer',
      access_token: this.jwtService.sign({ sub: id }),
      expires_in: this.configService.get<string>('jwt.expiresIn'),
    };
  }
}
