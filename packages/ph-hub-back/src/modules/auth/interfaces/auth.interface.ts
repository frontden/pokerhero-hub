import { UserEntity } from '../../database/entities/user.entity';

export interface JwtPayload {
  sub: number;
  email: string;
  impersonatedBy?: number;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: Omit<UserEntity, 'refreshToken' | 'deviceFingerprint' | 'tokenExpiresAt'>;
}
