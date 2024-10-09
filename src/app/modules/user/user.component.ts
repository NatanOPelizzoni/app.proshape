import { Component, OnInit } from '@angular/core';
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { ButtonDirective } from "primeng/button";
import { Ripple } from "primeng/ripple";
import { Table, TableModule } from "primeng/table";
import { User } from "../../data/interfaces/user";
import { UserService } from "../../core/services/user.service";
import { MessageService } from "primeng/api";
import { InputTextModule } from "primeng/inputtext";

@Component({
	selector: 'app-user',
	standalone: true,
	imports: [
		ToastModule,
		ToolbarModule,
		ButtonDirective,
		Ripple,
		TableModule,
		InputTextModule
	],
	providers: [MessageService],
	templateUrl: './user.component.html',
	styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

	userDialog: boolean = false;

	deleteUserDialog: boolean = false;

	deleteUsersDialog: boolean = false;

	users: User[] = [];

	user: User = {};

	selectedUsers: User[] = [];

	submitted: boolean = false;

	cols: any[] = [];

	statuses: any[] = [];

	rowsPerPageOptions = [5, 10, 20];

	constructor(
		private userService: UserService,
		private MessageService: MessageService
	) {
	}

	ngOnInit() {
		this.userService.getUsers().then(data => this.users = data);

		this.cols = [
			{field: 'id', header: 'ID'},
			{field: 'name', header: 'Nome'},
			{field: 'email', header: 'Email'},
			{field: 'status', header: 'Status'}
		];
	}

	editUser(user: User) {
		this.user = { ...user };
	}

	deleteUser(user: User) {
		this.deleteUserDialog = true;
		this.user = { ...user };
	}

	onGlobalFilter(table: Table, event: Event) {
		table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
	}
}
