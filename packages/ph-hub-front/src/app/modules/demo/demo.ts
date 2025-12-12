import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DEMO_FEATURE } from './demo.model';
import { Router, RouterOutlet } from '@angular/router';

@Component({
	selector: 'ph-demo',
	imports: [
		RouterOutlet,
	],
	templateUrl: './demo.html',
	styleUrl: './demo.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Demo {

	features = DEMO_FEATURE;

	constructor(private readonly router: Router) {}

	changeFeature(feature: DEMO_FEATURE) {
		this.router.navigate(['/', 'demo', feature]);
	}
}
