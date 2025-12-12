import { CHART_ACTIONS } from '../../constants';

export class ChartEditorCellInterface {
	label: string;
	actions: ChartEditorCellZoneActionInterface[];
}

export class ChartEditorCellZoneActionInterface {
	type: CHART_ACTIONS;
	frequency: number;
	color: string;
}