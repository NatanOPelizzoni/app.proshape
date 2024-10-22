import { Routes } from '@angular/router';
import { LoginComponent } from "./modules/auth/login/login.component";
import { LayoutComponent } from "./layouts/layout/layout.component";
import { UserComponent } from "./modules/user/user.component";
import { UserFormComponent } from "./modules/user/user-form/user-form.component";
import { ClientComponent } from "./modules/client/client.component";
import { ClientFormComponent } from "./modules/client/client-form/client-form.component";
import { BodyGroupComponent } from "./modules/body-group/body-group.component";

export const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'app',
		component: LayoutComponent,
		children: [
			// User Routes
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
			},

			// Client routes
			{
				path: 'client',
				component: ClientComponent
			},
			{
				path: 'client/create',
				component: ClientFormComponent
			},
			{
				path: 'client/:id/update',
				component: ClientFormComponent
			},
			{
				path: 'client/:id/view',
				component: ClientFormComponent
			},

			// Body Group routes
			{
				path: 'body-group',
				component: BodyGroupComponent
			},
			{
				path: 'body-group/create',
				component: ClientFormComponent
			},
			{
				path: 'body-group/:id/update',
				component: ClientFormComponent
			},
			{
				path: 'body-group/:id/view',
				component: ClientFormComponent
			},
		]
	}
];
