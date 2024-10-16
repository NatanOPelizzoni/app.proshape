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
import { DialogModule } from "primeng/dialog";
import { NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
	selector: 'app-user',
	standalone: true,
	imports: [
		ToastModule,
		ToolbarModule,
		ButtonDirective,
		Ripple,
		TableModule,
		InputTextModule,
		DialogModule,
		NgIf,
		RouterLink
	],
	templateUrl: './user.component.html',
	styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

	deleteUserDialog: boolean = false;

	deleteUsersDialog: boolean = false;

	users: User[] = [];

	user: User = {};

	selectedUsers: User[] = [];

	cols: any[] = [];

	statuses: any[] = [];

	rowsPerPageOptions = [5, 10, 20];

	constructor(
		private userService: UserService,
		private messageService: MessageService
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

	confirmDelete() {
		this.deleteUserDialog = false;
		this.users = this.users.filter(val => val.id !== this.user.id);
		this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário deletado', life: 3000 });
		this.user = {};
	}

	deleteSelectedProducts() {
		this.deleteUsersDialog = true;
	}

	confirmDeleteSelected() {
		this.deleteUsersDialog = false;
		this.users = this.users.filter(val => !this.selectedUsers.includes(val));
		this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuários Deletados', life: 3000 });
		this.selectedUsers = [];
	}

	onGlobalFilter(table: Table, event: Event) {
		table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
	}
}
