import { UserEntity } from '../../database/entities/user.entity';
import { User, UserPreferences } from '@ph-hub/common';
import { UserPreferencesEntity } from '../../database/entities/user-preferences.entity';

export function mapToUser(user: UserEntity): User {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    nickname: user.nickname,
    avatar: user.avatar,
    emailVerified: user.emailVerified,
    onboardingCompleted: user.onboardingCompleted,
    lastLoginAt: user.lastLoginAt,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    accessLevel: user.accessLevel,
    preferences: user.preferences
      ? mapToUserPreferences(user.preferences)
      : undefined,
  };
}

export function mapToUserPreferences(
  preferences: UserPreferencesEntity,
): UserPreferences {
  return {
    id: preferences.id,
    gameType: preferences.gameType,
    spinType: preferences.spinType,
    limits: preferences.limits,
    pokerRooms: preferences.pokerRooms,
    createdAt: preferences.createdAt,
    updatedAt: preferences.updatedAt,
  };
}
