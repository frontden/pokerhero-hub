import { CHART_ACTIONS, ChartAnswer, DEFAULT_ACTION_COLOR_SETTINGS } from '@ph-hub/common';

export const DEFAULT_ANSWERS: ChartAnswer[] = [
	{
		actions: [
			{
				type: CHART_ACTIONS.FOLD,
				frequency: 100,
				color: DEFAULT_ACTION_COLOR_SETTINGS.fold,
			},
		]
	},
	{
		actions: [
			{
				type: CHART_ACTIONS.CALL,
				frequency: 100,
				color: DEFAULT_ACTION_COLOR_SETTINGS.call,
			},
		]
	},
	{
		actions: [
			{
				type: CHART_ACTIONS.ALL_IN,
				frequency: 100,
				color: DEFAULT_ACTION_COLOR_SETTINGS.allIn,
			},
		]
	},
	{
		actions: [
			{
				type: CHART_ACTIONS.RAISE1,
				frequency: 100,
				color: DEFAULT_ACTION_COLOR_SETTINGS.raise1,
				raiseAmount: 2,
			},
		]
	},
	{
		actions: [
			{
				type: CHART_ACTIONS.RAISE2,
				frequency: 100,
				color: DEFAULT_ACTION_COLOR_SETTINGS.raise2,
				raiseAmount: 2.5,
			},
		]
	},
	{
		actions: [
			{
				type: CHART_ACTIONS.RAISE3,
				frequency: 100,
				color: DEFAULT_ACTION_COLOR_SETTINGS.raise3,
				raiseAmount: 3,
			},
		]
	},
];