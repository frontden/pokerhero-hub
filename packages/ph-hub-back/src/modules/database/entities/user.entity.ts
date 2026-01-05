import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { AccessLevel } from '../../../shared/constants';
import { UserPreferencesEntity } from './user-preferences.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ type: 'text', array: true, nullable: true })
  avatar: string[];

  @Column({ name: 'access_level', default: AccessLevel.Basic })
  accessLevel: number;

  @Column({ name: 'email_verified', default: false })
  emailVerified: boolean;

  @Column({ name: 'last_login_at', nullable: true })
  lastLoginAt: Date;

  @Column({ name: 'google_id', nullable: true, unique: true })
  googleId: string;

  @Column({ name: 'refresh_token', nullable: true, unique: true })
  refreshToken: string;

  @Column({ name: 'device_fingerprint', nullable: true })
  deviceFingerprint: string;

  @Column({ name: 'token_expires_at', nullable: true })
  tokenExpiresAt: Date;

  @Column({ name: 'onboarding_completed', default: false })
  onboardingCompleted: boolean;

  @Column({ nullable: true })
  nickname: string;

  @OneToOne(() => UserPreferencesEntity, (preferences) => preferences.user, {
    eager: true,
    cascade: true,
  })
  preferences: UserPreferencesEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
