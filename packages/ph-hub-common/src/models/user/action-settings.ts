export interface HotkeySettingsInterface {
	id?: number;
	type: HotkeyActionType;
	color: string;
	key: string;
	keyCode: string;
}

export enum HotkeyActionType {
	fold = 'Fold',
	callCheck = 'Call / Check',
	allIn = 'All-in',
	raise1 = 'Raise1',
	raise2 = 'Raise2',
	raise3 = 'Raise3',
	closeHint = 'Close Hint',
}