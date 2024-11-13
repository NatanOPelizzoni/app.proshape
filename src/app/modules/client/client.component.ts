import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonDirective } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { NgIf } from "@angular/common";
import { PrimeTemplate } from "primeng/api";
import { Ripple } from "primeng/ripple";
import { Table, TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { Router } from "@angular/router";
import { Client } from "../../data/interfaces/client";
import { ClientService } from "./client.service";
import { User } from "../../data/interfaces/user";
import { UserService } from "../user/user.service";
import { Subscription } from "rxjs";
import { ToastService } from "../../shared/services/toast.service";

@Component({
	selector: 'app-client',
	standalone: true,
	imports: [
		ButtonDirective,
		DialogModule,
		InputTextModule,
		NgIf,
		PrimeTemplate,
		Ripple,
		TableModule,
		ToastModule,
		ToolbarModule
	],
	templateUrl: './client.component.html',
	styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit, OnDestroy {

	subscriptions: Subscription[] = [];

	deleteClientDialog: boolean = false;

	deleteClientsDialog: boolean = false;

	clients: Client[] = [];

	client: Client = {};

	selectedClients: Client[] = [];

	cols: any[] = [];

	instructors: User[] = [];

	rowsPerPageOptions = [5, 10, 20];

	constructor(
		private clientService: ClientService,
		private userService: UserService,
		private toastService: ToastService,
		private router: Router,
	) {
	}

	ngOnInit() {
		this.subscriptions.push(this.clientService.getAll().subscribe(data => this.clients = data));

		this.cols = [
			{field: 'id', header: 'ID'},
			{field: 'name', header: 'Nome'},
			{field: 'email', header: 'Email'},
			{field: 'status', header: 'Status'},
			{field: 'birth_date', header: 'Data de Nascimento'},
			{field: 'weight', header: 'Peso'},
			{field: 'height', header: 'Altura'},
			{field: 'fitness_goals', header: 'Objetivos'},
			{field: 'training_frequency', header: 'Frequência de Treino'},
			{field: 'health_restrictions', header: 'Restrições de Saúde'},
			{field: 'preferred_workout_type', header: 'Tipo de Treino Preferido'},
			{field: 'exercise_history', header: 'Histórico de Exercícios'},
			{field: 'current_fitness_level', header: 'Nível de Fitness Atual'},
			{field: 'injuries_or_surgeries', header: 'Lesões ou Cirurgias'},
			{field: 'instructor_id', header: 'Instrutor'},
		];

		this._getInstructors();
	}

	ngOnDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	openNew() {
		this.router.navigate([`app/client/create`]);
	}

	editClient(client: Client) {
		this.client = {...client};
		this.router.navigate([`app/client/${client.id}/update`]);
	}

	viewClient(client: Client) {
		this.client = {...client};
		this.router.navigate([`app/client/${client.id}/view`]);
	}

	deleteClient(client: Client) {
		this.deleteClientDialog = true;
		this.client = {...client};
	}

	confirmDelete() {
		if (this.client.id !== undefined) {
			const subscription = this.clientService.destroy(this.client.id).subscribe(
				response => {
					this.clients = this.clients.filter(val => val.id !== this.client.id);
					this.client = {};
					this.toastService.showToast('success', 'Sucesso', 'Cliente deletado', 3000);
				},
				error => {
					this.toastService.showCrudAlerts(error.error.errors);
				}
			);
			this.subscriptions.push(subscription);
			this.deleteClientDialog = false;
		}
	}

	deleteSelectedClients() {
		this.deleteClientsDialog = true;
	}

	confirmDeleteSelected() {
		const selectedUsersIds = this.selectedClients.map(val => val.id as number);
		const subscription = this.clientService.massDelete({ids: selectedUsersIds}).subscribe(
			response => {
				this.clients = this.clients.filter(val => !this.selectedClients.includes(val));
				this.selectedClients = [];
				this.toastService.showToast('success', 'Sucesso', 'Clientes deletados', 3000);
			},
			error => {
				this.toastService.showCrudAlerts(error.error.errors);
			}
		);
		this.subscriptions.push(subscription);
		this.deleteClientsDialog = false;
	}

	onGlobalFilter(table: Table, event: Event) {
		table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
	}

	getInstructor(id: number) {
		// TODO: AJEITAR ESSA FUNÇÃO PARA QUE TRAGA O NOME DO INSTRUTOR DIRETO NA REQUEST
		//  // POIS ASSIM COMO TA EXECUTA VARIAS VEZES POR ESTAR SENDO CHAMADO DENTRO DO HTML
		return this.instructors.find(instructor => instructor.id === id)?.name;
	}

	private _getInstructors() {
		const subscription = this.userService.getInstructors().subscribe(instructors => {
			this.instructors = instructors;
		});
		this.subscriptions.push(subscription);
	}
}
