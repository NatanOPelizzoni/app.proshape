import { Routes } from '@angular/router';
import { LoginComponent } from "./modules/auth/login/login.component";
import { LayoutComponent } from "./layouts/layout/layout.component";
import { UserComponent } from "./modules/user/user.component";

export const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'app',
		component: LayoutComponent,
		children: [
			{
				path: 'user',
				component: UserComponent
			}
		]
	}
];
