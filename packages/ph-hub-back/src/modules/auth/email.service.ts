import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly loopsApiKey: string;
  private readonly loopsTransactionalId: string;
  private readonly loopsApiUrl = 'https://app.loops.so/api/v1';

  constructor(private configService: ConfigService) {
    this.loopsApiKey = this.configService.get('LOOPS_API_KEY');
    this.loopsTransactionalId = this.configService.get(
      'LOOPS_TRANSACTIONAL_ID',
    );
  }

  async sendVerificationCode(email: string, code: string): Promise<void> {
    if (this.configService.get('NODE_ENV') === 'development') {
      this.logger.log(`[DEV] Email to ${email}: Your code is ${code}`);

      await this.sendViaLoops(email, code);
      return;
    }

    await this.sendViaLoops(email, code);
  }

  private async sendViaLoops(email: string, code: string): Promise<void> {
    if (!this.loopsApiKey || !this.loopsTransactionalId) {
      this.logger.error('Loops.so credentials not configured');
      throw new Error('Email service not configured');
    }

    try {
      const response = await fetch(`${this.loopsApiUrl}/transactional`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.loopsApiKey}`,
        },
        body: JSON.stringify({
          transactionalId: this.loopsTransactionalId,
          email: email,
          dataVariables: {
            code: code,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(`Loops API error: ${response.status} - ${errorText}`);
        throw new Error(`Failed to send email: ${response.statusText}`);
      }

      const result = await response.json();
      this.logger.log(`Verification code sent to ${email} via Loops.so`);

      return result;
    } catch (error) {
      this.logger.error('Failed to send email via Loops.so:', error);
      throw error;
    }
  }
}