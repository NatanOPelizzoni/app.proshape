import { Routes } from '@angular/router';
import { LoginComponent } from "./modules/auth/login/login.component";
import { LayoutComponent } from "./layouts/layout/layout.component";
import { UserComponent } from "./modules/user/user.component";
import { UserFormComponent } from "./modules/user/user-form/user-form.component";

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
			},
			{
				path: 'user/create',
				component: UserFormComponent
			},
			{
				path: 'user/:id/update',
				component: UserFormComponent
			},
			{
				path: 'user/:id/view',
				component: UserFormComponent
			}
		]
	}
];
