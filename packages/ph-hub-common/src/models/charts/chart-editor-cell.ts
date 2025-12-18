import { CHART_ACTIONS } from '../../constants';

export interface ChartEditorCellInterface {
	label: string;
	actions: ChartEditorCellZoneActionInterface[];
}

export interface ChartEditorCellZoneActionInterface {
	type: CHART_ACTIONS;
	frequency: number;
	color: string;
	raiseAmount?: number;
}

export interface ChartAnswer {
	actions: ChartEditorCellZoneActionInterface[];
}