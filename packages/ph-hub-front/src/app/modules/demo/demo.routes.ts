import { Routes } from '@angular/router';
import { CreateHeroDemo } from './create-hero-demo/create-hero-demo';
import { CreateChartsDemo } from './create-charts-demo/create-charts-demo';

export const demoRoutes: Routes = [
  {
    path: 'create-hero',
    component: CreateHeroDemo,
  },
  {
    path: 'charts',
    component: CreateChartsDemo,
  },
];
