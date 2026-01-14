import { Routes } from '@angular/router';
import { demoRoutes } from './modules/demo/demo.routes';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';
import { OnboardingComponent } from './modules/onboarding/components/onboarding/onboarding.component';
import { onboardingGuard } from './guards/onboarding.guard';
import { onboardingCompleteGuard } from './guards/onboarding-complete.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { packsRoutes } from './modules/packs/packs.routes';

export const routes: Routes = [
	// {
	// 	path: '',
	// 	redirectTo: 'demo',
	// 	pathMatch: 'full',
	// },
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [guestGuard],
	},
	{
		path: 'auth/callback',
		component: AuthCallbackComponent,
	},
	{
		path: 'start',
		component: OnboardingComponent,
		canActivate: [authGuard, onboardingCompleteGuard],
	},
	{
		path: '',
		component: LayoutComponent,
		canActivate: [authGuard, onboardingGuard],
		children: [
			{
				path: 'demo',
				loadComponent: () => import('./modules/demo/demo').then(m => m.Demo),
				children: demoRoutes,
			},
			{
				path: 'packs',
				loadComponent: () => import('./modules/packs/packs').then(m => m.Packs),
				children: packsRoutes,
			},
		]
	},
];