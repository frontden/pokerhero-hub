import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { ChartAnswer } from '@ph-hub/common';
import { ActionTypeToLabelPipe } from '@shared/pipes/action-type-to-label-pipe';

@Component({
	selector: 'ph-simple-answer-button',
  imports: [
    ActionTypeToLabelPipe
  ],
	templateUrl: './simple-answer-button.html',
	styleUrl: './simple-answer-button.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleAnswerButton {
    answer = input<ChartAnswer>();
    selected = output<void>();
    action = computed(() => {
      return this.answer().actions[0];
    });
}
