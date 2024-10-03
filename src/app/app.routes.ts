import { Routes } from '@angular/router';
import { LoginComponent } from "./modules/auth/login/login.component";
import { LayoutComponent } from "./layouts/layout/layout.component";

export const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'app',
		component: LayoutComponent,
		children: [
		]
	}
];
