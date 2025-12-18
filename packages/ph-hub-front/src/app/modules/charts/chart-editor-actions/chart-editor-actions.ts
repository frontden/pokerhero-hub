import { Component, effect, input, output, signal } from '@angular/core';
import { ChartAnswer } from '@ph-hub/common';
import { transformActionTypeToLabel } from '@shared/helpers';
import { SimpleAnswerButton } from '../simple-answer-button/simple-answer-button';
import { SplitAnswerButton } from '../split-answer-button/split-answer-button';

export interface SimpleChartAnswer {
  label: string;
  color: string;
}

@Component({
    selector: 'ph-chart-editor-actions',
    imports: [
        SimpleAnswerButton,
        SplitAnswerButton
    ],
    templateUrl: './chart-editor-actions.html',
    styleUrl: './chart-editor-actions.scss',
})
export class ChartEditorActions {
    isEditing = input<boolean>(false);
    answers = input<ChartAnswer[]>([]);
    answerSelected = output<ChartAnswer>();

    simpleAnswers = signal<ChartAnswer[]>([]);
    splitAnswers = signal<ChartAnswer[]>([]);
    viewModeAnswers = signal<SimpleChartAnswer[]>([]);

    constructor() {
      effect(() => {
        this.simpleAnswers.set(this.answers().filter(answer => answer.actions.length === 1));
        this.splitAnswers.set(this.answers().filter(answer => answer.actions.length > 1));
        if (!this.isEditing()) {
          this.viewModeAnswers.set(this.simpleAnswers().map(simpleAnswer => {
            const label = transformActionTypeToLabel(simpleAnswer.actions[0].type);
            const raiseAmount = simpleAnswer.actions[0].raiseAmount;
            return {
              label: `${label}${raiseAmount ? ` x${raiseAmount}` : ''}`,
              color: simpleAnswer.actions[0].color,
            };
          }));
        }
      });
    }
}
