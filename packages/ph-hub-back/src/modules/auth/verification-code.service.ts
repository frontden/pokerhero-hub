import { Injectable, BadRequestException } from '@nestjs/common';

interface VerificationCode {
  code: string;
  expiresAt: Date;
  attempts: number;
  createdAt: Date;
}

@Injectable()
export class VerificationCodeService {
  private codes = new Map<string, VerificationCode>();
  private readonly CODE_EXPIRY = 60 * 1000;
  private readonly MAX_ATTEMPTS = 3;
  private readonly RATE_LIMIT = 60 * 1000;

  generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async saveCode(email: string): Promise<string> {
    const normalizedEmail = email.toLowerCase().trim();

    const existing = this.codes.get(normalizedEmail);
    if (existing) {
      const timeSinceCreation = Date.now() - existing.createdAt.getTime();
      if (timeSinceCreation < this.RATE_LIMIT) {
        const waitTime = Math.ceil(
          (this.RATE_LIMIT - timeSinceCreation) / 1000,
        );
        throw new BadRequestException(
          `Please wait ${waitTime} seconds before requesting a new code`,
        );
      }
    }

    const code = this.generateCode();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + this.CODE_EXPIRY);

    this.codes.set(normalizedEmail, {
      code,
      expiresAt,
      attempts: 0,
      createdAt: now,
    });

    setTimeout(() => {
      this.codes.delete(normalizedEmail);
    }, this.CODE_EXPIRY);

    return code;
  }

  async verifyCode(email: string, inputCode: string): Promise<boolean> {
    const normalizedEmail = email.toLowerCase().trim();
    const stored = this.codes.get(normalizedEmail);

    if (!stored) {
      throw new BadRequestException('Code not found or expired');
    }

    if (new Date() > stored.expiresAt) {
      this.codes.delete(normalizedEmail);
      throw new BadRequestException('Code expired');
    }

    if (stored.attempts >= this.MAX_ATTEMPTS) {
      this.codes.delete(normalizedEmail);
      throw new BadRequestException('Too many attempts. Request a new code');
    }

    stored.attempts++;

    if (stored.code !== inputCode) {
      return false;
    }

    this.codes.delete(normalizedEmail);
    return true;
  }

  cleanExpired(): void {
    const now = new Date();
    for (const [email, data] of this.codes.entries()) {
      if (now > data.expiresAt) {
        this.codes.delete(email);
      }
    }
  }
}
