import {
	ActionColorSettingsInterface,
	CHART_ACTIONS,
	CHART_ACTIONS_SYMBOL,
	ChartEditorCellInterface,
	ChartEditorCellZoneActionInterface,
	combinationsMap,
	DEFAULT_ACTION_COLOR_SETTINGS,
} from '@ph-hub/common';

export function transformCombinationsToChartCells(combinations: string, colors: ActionColorSettingsInterface = DEFAULT_ACTION_COLOR_SETTINGS): ChartEditorCellInterface[] {
	const hands = combinations.split('#').filter(v => !!v);
	const cells: ChartEditorCellInterface[] = [];
	hands.forEach(hand => {
		const [handId, split, actionsStr] = hand.split(',');
		const actions: ChartEditorCellZoneActionInterface[] = [];
		const isSplit = split === 'y';
		if (isSplit) {
			const splits = actionsStr.split('-');
			splits.forEach(splitAction => {
				actions.push(handleSplitAction(splitAction, colors));
			});
		} else {
			const type = convertActionSymbolToType(actionsStr);
			if (type !== CHART_ACTIONS.NONE) {
				actions.push({
					type,
					frequency: 100,
					color: getActionColor(type, colors),
				});
			}
		}
		cells.push({
			label: combinationsMap.get(handId),
			actions,
		});
	});
	return cells;
}

export function handleSplitAction(value: string, colors: ActionColorSettingsInterface): ChartEditorCellZoneActionInterface {
	const type = convertActionSymbolToType(value.split('(')[0]);
	const frequency = +value.split('(')[1].split(')')[0];
	return {
		type,
		frequency,
		color: getActionColor(type, colors),
	}
}

export function convertActionSymbolToType(symbol: string): CHART_ACTIONS {
	switch (symbol) {
		case CHART_ACTIONS_SYMBOL.FOLD:
			return CHART_ACTIONS.FOLD;
		case CHART_ACTIONS_SYMBOL.CALL:
			return CHART_ACTIONS.CALL;
		case CHART_ACTIONS_SYMBOL.CHECK:
			return CHART_ACTIONS.CHECK;
		case CHART_ACTIONS_SYMBOL.RAISE1:
			return CHART_ACTIONS.RAISE1;
		case CHART_ACTIONS_SYMBOL.RAISE2:
			return CHART_ACTIONS.RAISE2;
		case CHART_ACTIONS_SYMBOL.RAISE3:
			return CHART_ACTIONS.RAISE3;
		case CHART_ACTIONS_SYMBOL.ALL_IN:
			return CHART_ACTIONS.ALL_IN;
		case CHART_ACTIONS_SYMBOL.FILTER:
			return CHART_ACTIONS.FILTER;
		default:
			return CHART_ACTIONS.NONE;
	}
}

export function getActionColor(action: CHART_ACTIONS, colors: ActionColorSettingsInterface): string {
	switch (action) {
		case CHART_ACTIONS.FOLD:
			return colors.fold;
		case CHART_ACTIONS.CALL:
			return colors.call;
		case CHART_ACTIONS.CHECK:
			return colors.check;
		case CHART_ACTIONS.RAISE1:
			return colors.raise1;
		case CHART_ACTIONS.RAISE2:
			return colors.raise2;
		case CHART_ACTIONS.RAISE3:
			return colors.raise3;
		case CHART_ACTIONS.ALL_IN:
			return colors.allIn;
		case CHART_ACTIONS.FILTER:
			return colors.filter;
		default:
			return '';
	}
}

export function transformActionTypeToLabel(action: CHART_ACTIONS): string {
	switch (action) {
		case CHART_ACTIONS.FOLD:
			return 'Fold';
		case CHART_ACTIONS.CALL:
			return 'Call';
		case CHART_ACTIONS.CHECK:
			return 'Check';
		case CHART_ACTIONS.RAISE1:
			return 'Raise';
		case CHART_ACTIONS.RAISE2:
			return 'Raise';
		case CHART_ACTIONS.RAISE3:
			return 'Raise';
		case CHART_ACTIONS.ALL_IN:
			return 'All-in';
		default:
			return '';
	}
}

