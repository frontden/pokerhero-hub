export interface OpponentType {
	id?: number;
	title: string;
	color: string;
	icon: string;
	isDefault?: boolean;
}

export interface CreateOpponentTypeRequest {
	title: string;
	color: string;
	icon: string;
	isDefault?: boolean;
}