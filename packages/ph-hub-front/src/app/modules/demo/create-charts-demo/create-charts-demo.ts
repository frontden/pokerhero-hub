import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Charts } from '../../charts/charts';

@Component({
	selector: 'ph-create-charts-demo',
	imports: [
		Charts
	],
	templateUrl: './create-charts-demo.html',
	styleUrl: './create-charts-demo.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateChartsDemo {

}
