import { Routes } from '@angular/router';
import { Demo } from './modules/demo/demo';
import { demoRoutes } from './modules/demo/demo.routes';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'demo',
		pathMatch: 'full',
	},
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
		path: 'demo',
		component: Demo,
		canActivate: [authGuard],
		children: demoRoutes,
	},
];