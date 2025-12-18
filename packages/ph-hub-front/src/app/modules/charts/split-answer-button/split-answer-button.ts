import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ChartAnswer } from '@ph-hub/common';
import { ActionTypeToLabelPipe } from '@shared/pipes/action-type-to-label-pipe';

@Component({
	selector: 'ph-split-answer-button',
  imports: [
    ActionTypeToLabelPipe
  ],
	templateUrl: './split-answer-button.html',
	styleUrl: './split-answer-button.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitAnswerButton {
	answer = input<ChartAnswer>();
	selected = output<void>();
}
