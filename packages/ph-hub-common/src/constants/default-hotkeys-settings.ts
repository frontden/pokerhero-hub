import { HotkeyActionType, HotkeySettingsInterface } from '../models/user/action-settings';


export const DEFAULT_HOTKEYS_SETTINGS: HotkeySettingsInterface[] = [
	{
		type: HotkeyActionType.fold,
		color: '#E0E0E0',
		key: 'A',
		keyCode: 'KeyA',
	},
	{
		type: HotkeyActionType.callCheck,
		color: '#FFB74D',
		key: 'S',
		keyCode: 'KeyS',
	},
	{
		type: HotkeyActionType.allIn,
		color: '#4CAF50',
		key: 'W',
		keyCode: 'KeyW',
	},
	{
		type: HotkeyActionType.raise1,
		color: '#7986CB',
		key: 'D',
		keyCode: 'KeyD',
	},
	{
		type: HotkeyActionType.raise2,
		color: '#8D6E63',
		key: 'E',
		keyCode: 'KeyE',
	},
	{
		type: HotkeyActionType.raise3,
		color: '#EF5350',
		key: 'Q',
		keyCode: 'KeyQ',
	},
	{
		type: HotkeyActionType.closeHint,
		color: '',
		key: 'ENTER',
		keyCode: 'Enter',
	},
];