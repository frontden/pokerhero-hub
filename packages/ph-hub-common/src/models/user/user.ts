export interface UserInterface {
	id?: number;
	email: string;
	name: string;
	avatar?: string[];
	emailVerified?: boolean;
	lastLoginAt?: Date;
	createdAt?: Date;
	updatedAt?: Date;
	accessLevel: number;
}
