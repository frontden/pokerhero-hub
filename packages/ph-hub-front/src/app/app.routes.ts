import { Routes } from '@angular/router';
import { Demo } from './modules/demo/demo';
import { demoRoutes } from './modules/demo/demo.routes';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'demo',
		pathMatch: 'full',
	},
	{
		path: 'demo',
		component: Demo,
		children: demoRoutes,
	},
];
