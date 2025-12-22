import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Headers,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthResponse } from './interfaces/auth.interface';
import { generateDeviceFingerprint } from './helpers/generate-fingerprint';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('send-code')
  async sendCode(@Body('email') email: string): Promise<{ message: string }> {
    return this.authService.sendMagicLink(email);
  }

  @Post('verify-code')
  async verifyCode(
    @Body('email') email: string,
    @Body('code') code: string,
    @Headers('x-device-fingerprint') deviceFingerprint: string,
  ): Promise<AuthResponse> {
    if (!deviceFingerprint) {
      throw new UnauthorizedException('Device fingerprint required');
    }

    return this.authService.verifyMagicCode(email, code, deviceFingerprint);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(): Promise<void> {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(
    @Req() req,
    @Res() res: Response,
  ): Promise<void> {

    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';

    const deviceFingerprint = generateDeviceFingerprint(ip, userAgent);

    const result = await this.authService.googleLogin(
      req.user,
      deviceFingerprint,
    );

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4200';
    const redirectUrl = `${frontendUrl}/auth/callback?accessToken=${result.accessToken}&refreshToken=${result.refreshToken}&deviceFingerprint=${deviceFingerprint}`;

    res.redirect(redirectUrl);
  }

  @Post('refresh')
  async refresh(
    @Body('refreshToken') refreshToken: string,
    @Headers('x-device-fingerprint') deviceFingerprint: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    if (!deviceFingerprint) {
      throw new UnauthorizedException('Device fingerprint required');
    }

    return this.authService.refreshTokens(refreshToken, deviceFingerprint);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Req() req): Promise<{ message: string }> {
    await this.authService.logout(req.user.id);
    return { message: 'Logged out successfully' };
  }

  @Post('impersonate/:userId')
  @UseGuards(AuthGuard('jwt'))
  async impersonate(
    @Req() req,
    @Body('userId') targetUserId: number,
    @Headers('x-device-fingerprint') deviceFingerprint: string,
  ): Promise<AuthResponse> {
    if (!deviceFingerprint) {
      throw new UnauthorizedException('Device fingerprint required');
    }

    return this.authService.impersonate(
      req.user.id,
      targetUserId,
      deviceFingerprint,
    );
  }

  @Post('stop-impersonation')
  @UseGuards(AuthGuard('jwt'))
  async stopImpersonation(
    @Req() req,
    @Headers('x-device-fingerprint') deviceFingerprint: string,
  ): Promise<AuthResponse> {
    if (!req.user.impersonatedBy) {
      throw new UnauthorizedException('Not currently impersonating');
    }

    return this.authService.stopImpersonation(
      req.user.impersonatedBy,
      deviceFingerprint,
    );
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getCurrentUser(@Req() req) {
    return req.user;
  }
}
