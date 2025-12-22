import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { VerificationCodeService } from './verification-code.service';
import { EmailService } from './email.service';
import { v4 as uuidv4 } from 'uuid';
import { JwtPayload, AuthResponse } from './interfaces/auth.interface';
import { AccessLevel } from '../../shared/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private verificationCodeService: VerificationCodeService,
    private emailService: EmailService,
  ) {}

  async sendMagicLink(email: string): Promise<{ message: string }> {
    const normalizedEmail = email.toLowerCase().trim();

    if (!this.isValidEmail(normalizedEmail)) {
      throw new BadRequestException('Invalid email format');
    }

    const code = await this.verificationCodeService.saveCode(normalizedEmail);
    await this.emailService.sendVerificationCode(normalizedEmail, code);

    return { message: 'Verification code sent. Check your email.' };
  }

  async verifyMagicCode(
    email: string,
    code: string,
    deviceFingerprint: string,
  ): Promise<AuthResponse> {
    const normalizedEmail = email.toLowerCase().trim();

    const isValid = await this.verificationCodeService.verifyCode(
      normalizedEmail,
      code,
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid verification code');
    }

    let user = await this.userRepository.findOne({
      where: { email: normalizedEmail },
    });

    if (!user) {
      user = this.userRepository.create({
        email: normalizedEmail,
        name: normalizedEmail.split('@')[0],
        emailVerified: true,
        accessLevel: 0,
      });
      user = await this.userRepository.save(user);
    } else {
      user.lastLoginAt = new Date();
      user.emailVerified = true;
      await this.userRepository.save(user);
    }

    return this.createAuthResponse(user, deviceFingerprint);
  }

  async googleLogin(
    googleProfile: any,
    deviceFingerprint: string,
  ): Promise<AuthResponse> {
    const email = googleProfile.email.toLowerCase();
    let user = await this.userRepository.findOne({
      where: [{ googleId: googleProfile.sub }, { email }],
    });

    if (!user) {
      user = this.userRepository.create({
        email,
        name: googleProfile.name || email.split('@')[0],
        avatar: googleProfile.picture ? [googleProfile.picture] : null,
        googleId: googleProfile.sub,
        emailVerified: true,
        accessLevel: 0,
      });
      user = await this.userRepository.save(user);
    } else {
      if (!user.googleId) {
        user.googleId = googleProfile.sub;
      }
      user.lastLoginAt = new Date();
      user.emailVerified = true;
      if (googleProfile.picture && !user.avatar) {
        user.avatar = [googleProfile.picture];
      }
      await this.userRepository.save(user);
    }

    return this.createAuthResponse(user, deviceFingerprint);
  }

  private async createAuthResponse(
    user: UserEntity,
    deviceFingerprint: string,
    impersonatedBy?: number,
  ): Promise<AuthResponse> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      ...(impersonatedBy && { impersonatedBy }),
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = uuidv4();

    user.refreshToken = refreshToken;
    user.deviceFingerprint = deviceFingerprint;
    user.tokenExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    await this.userRepository.save(user);

    const {
      refreshToken: _,
      deviceFingerprint: __,
      tokenExpiresAt: ___,
      ...userWithoutTokens
    } = user;

    return {
      accessToken,
      refreshToken,
      user: userWithoutTokens,
    };
  }

  async refreshTokens(
    refreshToken: string,
    deviceFingerprint: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findOne({
      where: { refreshToken },
    });

    if (!user || !user.tokenExpiresAt || user.tokenExpiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    if (user.deviceFingerprint !== deviceFingerprint) {
      user.refreshToken = null;
      user.deviceFingerprint = null;
      await this.userRepository.save(user);
      throw new UnauthorizedException('Session mismatch. Please login again.');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(userId: number): Promise<void> {
    await this.userRepository.update(userId, {
      refreshToken: null,
      deviceFingerprint: null,
      tokenExpiresAt: null,
    });
  }

  async impersonate(
    adminId: number,
    targetUserId: number,
    deviceFingerprint: string,
  ): Promise<AuthResponse> {
    const admin = await this.userRepository.findOne({ where: { id: adminId } });

    if (!admin || admin.accessLevel !== AccessLevel.Admin) {
      throw new ForbiddenException('Only admins can impersonate users');
    }

    const targetUser = await this.userRepository.findOne({
      where: { id: targetUserId },
    });

    if (!targetUser) {
      throw new BadRequestException('Target user not found');
    }

    return this.createAuthResponse(targetUser, deviceFingerprint, adminId);
  }

  async stopImpersonation(
    adminId: number,
    deviceFingerprint: string,
  ): Promise<AuthResponse> {
    const admin = await this.userRepository.findOne({ where: { id: adminId } });

    if (!admin) {
      throw new UnauthorizedException('Admin not found');
    }

    return this.createAuthResponse(admin, deviceFingerprint);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async validateUser(userId: number): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { id: userId } });
  }
}
