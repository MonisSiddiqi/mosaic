import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as nodemailer from 'nodemailer';

type MailOptions = {
  from: string;
  to: string;
  subject: string;
  html?: string;
};

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  async sendRegisterOtpMail(email: string, name: string, otp: string) {
    const mailOptions = {
      // from: this.configService.get<string>('smtp.user'),
      from: 'no-reply@craftyfuture.com',
      to: email,
      subject: 'Your OTP for Crafty Future Registration',
      html: `
        <p>Dear ${name},</p>
        <p>Your OTP is:</p>
        <p><strong>${otp}</strong></p>
        <p>Please do not share this OTP with anyone to ensure the security of your account.</p>
        <p>If you did not request this, please ignore this message.</p>
        <p>Thank you for choosing us </p>
        <p>Best regards,<br />Crafty Future Support Team</p>
      `,
    };

    await this.sendMail(mailOptions);
  }

  async sendForgotPasswordMail(email: string, name: string, otp: string) {
    const mailOptions = {
      from: this.configService.get<string>('smtp.user'),
      to: email,
      subject: 'Your OTP for forgot password',
      html: `
        <p>Dear ${name},</p>
        <p>Your OTP is:</p>
        <p><strong>${otp}</strong></p>
        <p>Please do not share this OTP with anyone to ensure the security of your account.</p>
        <p>If you did not request this, please ignore this message.</p>
        <p>Thank you for choosing us </p>
        <p>Best regards,<br />Crafty Future Support Team</p>
      `,
    };

    await this.sendMail(mailOptions);
  }

  async sendMail(mailOptions: MailOptions) {
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('smtp.host'),
      port: this.configService.get<number>('smtp.port'),
      secure: false,
      auth: {
        user: this.configService.get<string>('smtp.user'),
        pass: this.configService.get<string>('smtp.password'),
      },
      tls: {
        rejectUnauthorized: false, // Use only in development
      },
    });

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info);
  }
}
