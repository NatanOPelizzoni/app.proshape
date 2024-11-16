import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { ToastService } from "../../shared/services/toast.service";
import { Router } from "@angular/router";
import { Table, TableModule } from "primeng/table";
import { TrainingSheet } from "../../data/interfaces/training-sheet";
import { TrainingSheetService } from "./training-sheet.service";
import { ClientService } from "../client/client.service";
import { ButtonDirective } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { JsonPipe, NgIf } from "@angular/common";
import { PrimeTemplate } from "primeng/api";
import { Ripple } from "primeng/ripple";
import { ToolbarModule } from "primeng/toolbar";

@Component({
  selector: 'app-training-sheet',
  standalone: true,
	imports: [
		ButtonDirective,
		DialogModule,
		InputTextModule,
		NgIf,
		PrimeTemplate,
		Ripple,
		TableModule,
		ToolbarModule,
		JsonPipe
	],
  templateUrl: './training-sheet.component.html',
  styleUrl: './training-sheet.component.scss'
})
export class TrainingSheetComponent implements OnInit, OnDestroy {

	subscriptions: Subscription[] = [];

	deleteTrainingSheetDialog: boolean = false;

	deleteTrainingSheetsDialog: boolean = false;

	trainingSheets: TrainingSheet[] = [];

	trainingSheet: TrainingSheet = {};

	selectedTrainingSheets: TrainingSheet[] = [];

	cols: any[] = [];

	clients: { [key: number]: string } = {};

	rowsPerPageOptions = [5, 10, 20];

	constructor(
		private trainingSheetService : TrainingSheetService,
		private exerciseService: TrainingSheetService,
		private clientService: ClientService,
		private toastService: ToastService,
		private router: Router,
	) {
		this._getClients();
	}

	ngOnInit() {

		this.cols = [
			{field: 'id', header: 'ID'},
			{field: 'clientName', header: 'Cliente'},
			{field: 'startDate', header: 'Data de Início'},
			{field: 'endDate', header: 'Data de Término'},
			{field: 'status', header: 'Status'},
		];
	}

	ngOnDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	openNew() {
		this.router.navigate([`app/training-sheet/create`]);
	}

	editTrainingSheet(trainingSheet: TrainingSheet) {
		this.trainingSheet = {...trainingSheet};
		this.router.navigate([`app/training-sheet/${trainingSheet.id}/update`]);
	}

	viewTrainingSheet(trainingSheet: TrainingSheet) {
		this.trainingSheet = {...trainingSheet};
		this.router.navigate([`app/training-sheet/${trainingSheet.id}/view`]);
	}

	deleteTrainingSheet(trainingSheet: TrainingSheet) {
		this.deleteTrainingSheetDialog = true;
		this.trainingSheet = {...trainingSheet};
	}

	confirmDelete() {
		if (this.trainingSheet.id !== undefined) {
			const subscription = this.exerciseService.destroy(this.trainingSheet.id).subscribe(
				response => {
					this.trainingSheets = this.trainingSheets.filter(val => val.id !== this.trainingSheet.id);
					this.trainingSheet = {};
					this.toastService.showToast('success', 'Sucesso', 'Ficha de treino deletada', 3000);
				},
				error => {
					this.toastService.showCrudAlerts(error.error.errors);
				}
			);
			this.subscriptions.push(subscription);
			this.deleteTrainingSheetDialog = false;
		}
	}

	deleteSelectedTrainingSheets() {
		this.deleteTrainingSheetsDialog = true;
	}

	confirmDeleteSelected() {
		const selectedTrainingSheetsIds = this.selectedTrainingSheets.map(val => val.id as number);
		const subscription = this.exerciseService.massDelete({ids: selectedTrainingSheetsIds}).subscribe(
			response => {
				this.trainingSheets = this.trainingSheets.filter(val => !this.selectedTrainingSheets.includes(val));
				this.selectedTrainingSheets = [];
				this.toastService.showToast('success', 'Sucesso', 'Fichas de treino deletadas', 3000);
			},
			error => {
				this.toastService.showCrudAlerts(error.error.errors);
			}
		);
		this.subscriptions.push(subscription);
		this.deleteTrainingSheetsDialog = false;
	}

	onGlobalFilter(table: Table, event: Event) {
		table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
	}

	private _loadFixedValues() {
		this.trainingSheets.forEach(trainingSheet => {
			if (trainingSheet.client_id !== undefined) {
				trainingSheet.client_name = this.clients[trainingSheet.client_id];
			} else {
				trainingSheet.client_name = ''; // or some default value
			}

			trainingSheet.start_date_formatted = this._formatDate(trainingSheet.start_date);
			trainingSheet.end_date_formatted = this._formatDate(trainingSheet.end_date);
		});
	}

	private _getClients() {
		const subscription = this.clientService.getClients().subscribe(clients => {
			this.clients = clients.reduce((acc, client) => {
				if (client.id !== undefined) {
					acc[client.id] = client.name ?? '';
				}
				return acc;
			}, {} as { [key: number]: string });
			this._getTrainingSheets();
		});
		this.subscriptions.push(subscription);
	}

	private _getTrainingSheets() {
		const subscription = this.trainingSheetService.getAll().subscribe(trainingSheets => {
			this.trainingSheets = trainingSheets;
			this._loadFixedValues();
		});
		this.subscriptions.push(subscription);
	}

	private _formatDate(date: string | undefined): string {
		if (date === undefined) {
			return '';
		}
		const [year, month, day] = date.split('-');
		return `${day}/${month}/${year}`;
	}
}
