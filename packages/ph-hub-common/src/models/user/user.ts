import { OpponentType } from '../poker';
import { HotkeySettingsInterface } from './action-settings';

export interface User {
	id?: number;
	email: string;
	name: string;
	nickname?: string;
	avatar?: string[];
	emailVerified?: boolean;
	onboardingCompleted?: boolean;
	lastLoginAt?: Date;
	createdAt?: Date;
	updatedAt?: Date;
	accessLevel: number;
	preferences?: UserPreferences;
	opponentTypes?: OpponentType[];
	hotkeySettings?: HotkeySettingsInterface[];
}

export interface UserPreferences {
	id?: number;
	gameType?: string;
	spinType?: string;
	limits?: string[];
	pokerRooms?: string[];
	createdAt?: Date;
	updatedAt?: Date;
}

export interface CreateUserPreferencesRequest {
	nickname: string;
	avatar: string[];
	gameType: string;
	spinType?: string;
	limits: string[];
	pokerRooms: string[];
}