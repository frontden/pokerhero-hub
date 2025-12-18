import { Pipe, PipeTransform } from '@angular/core';
import { CHART_ACTIONS } from '@ph-hub/common';
import { transformActionTypeToLabel } from '@shared/helpers';

@Pipe({
	name: 'actionTypeToLabel'
})
export class ActionTypeToLabelPipe implements PipeTransform {

	transform(action: CHART_ACTIONS): string {
		return transformActionTypeToLabel(action);
	}
}
