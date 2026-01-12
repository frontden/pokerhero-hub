import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChartEditor } from './chart-editor/chart-editor';
import {
  CHART_ACTIONS,
  ChartAnswer,
  ChartEditorCellZoneActionInterface,
  ChartInterface,
  DEFAULT_ACTION_COLOR_SETTINGS,
} from '@ph-hub/common';
import { ChartEditorActions } from './chart-editor-actions/chart-editor-actions';
import { DEFAULT_ANSWERS } from '@shared/constants';

@Component({
  selector: 'ph-charts',
  imports: [ChartEditor, ChartEditorActions],
  templateUrl: './charts.html',
  styleUrl: './charts.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Charts {
  mockActiveActions: ChartEditorCellZoneActionInterface[] = [
    {
      type: CHART_ACTIONS.RAISE1,
      frequency: 100,
      color: DEFAULT_ACTION_COLOR_SETTINGS.raise1,
    },
  ];
  mockChart: ChartInterface = {
    id: 1,
    combinations:
      '#0,n,r#1,n,a#2,n,a#3,n,a#4,n,a#5,n,a#6,n,a#7,n,a#8,n,a#9,n,a#10,y,a(50)-c(50)#11,y,a(50)-c(50)#12,y,a(50)-c(50)#13,n,a#14,n,r#15,n,a#16,n,a#17,y,a(50)-c(50)#18,n,c#19,n,c#20,y,c(50)-f(50)#21,n,f#22,n,f#23,n,f#24,n,f#25,n,f#26,n,a#27,n,a#28,n,r#29,n,c#30,n,c#31,n,c#32,n,c#33,n,f#34,n,f#35,n,f#36,n,f#37,n,f#38,n,f#39,n,a#40,y,a(50)-c(50)#41,n,c#42,n,a#43,n,c#44,n,c#45,n,c#46,n,f#47,n,f#48,n,f#49,n,f#50,n,f#51,n,f#52,n,a#53,y,c(50)-f(50)#54,y,c(50)-f(50)#55,y,c(50)-f(50)#56,n,a#57,n,c#58,n,c#59,n,f#60,n,f#61,n,f#62,n,f#63,n,f#64,n,f#65,n,a#66,n,f#67,n,f#68,n,f#69,n,f#70,n,a#71,n,c#72,y,c(50)-f(50)#73,n,f#74,n,f#75,n,f#76,n,f#77,n,f#78,y,a(50)-f(50)#79,n,f#80,n,f#81,n,f#82,n,f#83,n,f#84,n,a#85,n,c#86,n,f#87,n,f#88,n,f#89,n,f#90,n,f#91,n,f#92,n,f#93,n,f#94,n,f#95,n,f#96,n,f#97,n,f#98,n,a#99,n,c#100,n,f#101,n,f#102,n,f#103,n,f#104,n,f#105,n,f#106,n,f#107,n,f#108,n,f#109,n,f#110,n,f#111,n,f#112,n,a#113,y,c(50)-f(50)#114,n,f#115,n,f#116,n,f#117,n,f#118,n,f#119,n,f#120,n,f#121,n,f#122,n,f#123,n,f#124,n,f#125,n,f#126,n,a#127,y,c(50)-f(50)#128,n,f#129,n,f#130,n,f#131,n,f#132,n,f#133,n,f#134,n,f#135,n,f#136,n,f#137,n,f#138,n,f#139,n,f#140,n,a#141,n,f#142,n,f#143,n,f#144,n,f#145,n,f#146,n,f#147,n,f#148,n,f#149,n,f#150,n,f#151,n,f#152,n,f#153,n,f#154,n,a#155,n,f#156,n,f#157,n,f#158,n,f#159,n,f#160,n,f#161,n,f#162,n,f#163,n,f#164,n,f#165,n,f#166,n,f#167,n,f#168,n,a',
  };
  mockChart2: ChartInterface = {
    id: 2,
    combinations:
      '#0,n,n#1,n,n#2,n,n#3,n,n#4,n,n#5,n,n#6,n,n#7,n,n#8,n,n#9,n,n#10,n,n#11,n,n#12,n,n#13,n,n#14,n,n#15,n,n#16,n,n#17,n,n#18,n,n#19,n,n#20,n,n#21,n,n#22,n,n#23,n,n#24,n,n#25,n,n#26,n,n#27,n,n#28,n,n#29,n,n#30,n,n#31,n,n#32,n,n#33,n,n#34,n,n#35,n,n#36,n,n#37,n,n#38,n,n#39,n,n#40,n,n#41,n,n#42,n,n#43,n,n#44,n,n#45,n,n#46,n,n#47,n,n#48,n,n#49,n,n#50,n,n#51,n,n#52,n,n#53,n,n#54,n,n#55,n,n#56,n,n#57,n,n#58,n,n#59,n,n#60,n,n#61,n,n#62,n,n#63,n,n#64,n,n#65,n,n#66,n,n#67,n,n#68,n,n#69,n,n#70,n,n#71,n,n#72,n,n#73,n,n#74,n,n#75,n,n#76,n,n#77,n,n#78,n,n#79,n,n#80,n,n#81,n,n#82,n,n#83,n,n#84,n,n#85,n,n#86,n,n#87,n,n#88,n,n#89,n,n#90,n,n#91,n,n#92,n,n#93,n,n#94,n,n#95,n,n#96,n,n#97,n,n#98,n,n#99,n,n#100,n,n#101,n,n#102,n,n#103,n,n#104,n,n#105,n,n#106,n,n#107,n,n#108,n,n#109,n,n#110,n,n#111,n,n#112,n,n#113,n,n#114,n,n#115,n,n#116,n,n#117,n,n#118,n,n#119,n,n#120,n,n#121,n,n#122,n,n#123,n,n#124,n,n#125,n,n#126,n,n#127,n,n#128,n,n#129,n,n#130,n,n#131,n,n#132,n,n#133,n,n#134,n,n#135,n,n#136,n,n#137,n,n#138,n,n#139,n,n#140,n,n#141,n,n#142,n,n#143,n,n#144,n,n#145,n,n#146,n,n#147,n,n#148,n,n#149,n,n#150,n,n#151,n,n#152,n,n#153,n,n#154,n,n#155,n,n#156,n,n#157,n,n#158,n,n#159,n,n#160,n,n#161,n,n#162,n,n#163,n,n#164,n,n#165,n,n#166,n,n#167,n,n#168,n,n',
  };

  mockChartAnswers: ChartAnswer[] = [
    ...DEFAULT_ANSWERS,
    {
      actions: [
        {
          type: CHART_ACTIONS.FOLD,
          frequency: 50,
          color: DEFAULT_ACTION_COLOR_SETTINGS.fold,
        },
        {
          type: CHART_ACTIONS.CALL,
          frequency: 50,
          color: DEFAULT_ACTION_COLOR_SETTINGS.call,
        },
      ],
    },
    {
      actions: [
        {
          type: CHART_ACTIONS.RAISE2,
          frequency: 75,
          color: DEFAULT_ACTION_COLOR_SETTINGS.raise2,
          raiseAmount: 3,
        },
        {
          type: CHART_ACTIONS.FOLD,
          frequency: 25,
          color: DEFAULT_ACTION_COLOR_SETTINGS.fold,
        },
      ],
    },
  ];

  changeActionAnswer(answer: ChartAnswer): void {
    this.mockActiveActions = answer.actions;
  }
}
