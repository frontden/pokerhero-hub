import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ChartEditorCellInterface } from '@ph-hub/common';

@Component({
  selector: 'ph-chart-editor-cell',
  imports: [],
  templateUrl: './chart-editor-cell.html',
  styleUrl: './chart-editor-cell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartEditorCell {
  isSigned = input<boolean>(false);
  cell = input<ChartEditorCellInterface>();
}
