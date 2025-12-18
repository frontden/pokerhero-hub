import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';
import { ChartEditorCell } from '../chart-editor-cell/chart-editor-cell';
import { ChartEditorCellInterface, ChartEditorCellZoneActionInterface } from '@ph-hub/common';
import { transformCombinationsToChartCells } from '@shared/helpers';
import { AppService } from '../../../services/app.service';

@Component({
	selector: 'ph-chart-editor',
	imports: [
		ChartEditorCell,
	],
	templateUrl: './chart-editor.html',
	styleUrl: './chart-editor.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartEditor {
	isEditing = input<boolean>(false);
	combinations = input<string>('');
	activeActions = input<ChartEditorCellZoneActionInterface[]>([]);

	cells = signal<ChartEditorCellInterface[]>([]);

	constructor(private appService: AppService) {
		effect(() => {
			this.cells.set(transformCombinationsToChartCells(this.combinations()));
		});
	}

	onCellMouseEnter(cellIndex: number): void {
		if (this.isEditing() && this.appService.isMouseDown() && this.activeActions().length && !this.cells()[cellIndex].actions.length) {
			this.updateCell(cellIndex);
		}
	}

	onCellClicked(cellIndex: number): void {
		if (this.isEditing() && this.activeActions().length && !this.isActionsEqual(this.activeActions(), this.cells()[cellIndex].actions)) {
			this.updateCell(cellIndex);
		}
	}

	updateCell(cellIndex: number): void {
		const updatedValue = this.cells();
		updatedValue[cellIndex].actions = this.activeActions();
		this.cells.set(updatedValue);
	}

	isActionsEqual(actions: ChartEditorCellZoneActionInterface[], previousActions: ChartEditorCellZoneActionInterface[]): boolean {
		if (actions.length !== previousActions.length) {
			return false;
		}
		return actions.every((action, index) => action.type === previousActions[index].type && action.frequency === previousActions[index].frequency);
	}
}
