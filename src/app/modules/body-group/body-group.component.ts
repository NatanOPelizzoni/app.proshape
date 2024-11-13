import { Component, OnDestroy, OnInit } from '@angular/core';
import { BodyGroup } from "../../data/interfaces/body-group";
import { PrimeTemplate } from "primeng/api";
import { Router } from "@angular/router";
import { BodyGroupService } from "./body-group.service";
import { Table, TableModule } from "primeng/table";
import { ButtonDirective } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { NgIf } from "@angular/common";
import { Ripple } from "primeng/ripple";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { ToastService } from "../../shared/services/toast.service";
import { Subscription } from "rxjs";

@Component({
	selector: 'app-body-group',
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
	templateUrl: './body-group.component.html',
	styleUrl: './body-group.component.scss'
})
export class BodyGroupComponent implements OnInit, OnDestroy {

	deleteBodyGroupDialog: boolean = false;

	deleteBodyGroupsDialog: boolean = false;

	bodyGroups: BodyGroup[] = [];

	bodyGroup: BodyGroup = {};

	selectedBodyGroups: BodyGroup[] = [];

	cols: any[] = [];

	statuses: any[] = [];

	rowsPerPageOptions = [5, 10, 20];

	private subscriptions: Subscription[] = [];

	constructor(
		private bodyGroupService: BodyGroupService,
		private toastService: ToastService,
		private router: Router,
	) {
	}

	ngOnInit() {
		this.bodyGroupService.getAll().subscribe((data: BodyGroup[]) => this.bodyGroups = data);

		this.cols = [
			{field: 'id', header: 'ID'},
			{field: 'name', header: 'Nome'},
			{field: 'status', header: 'Status'},
		];
	}

	ngOnDestroy() {
		this.subscriptions.forEach(element => element.unsubscribe());
	}

	openNew() {
		this.router.navigate([`app/body-group/create`]);
	}

	editBodyGroup(bodyGroup: BodyGroup) {
		this.bodyGroup = {...bodyGroup};
		this.router.navigate([`app/body-group/${bodyGroup.id}/update`]);
	}

	viewBodyGroup(bodyGroup: BodyGroup) {
		this.bodyGroup = {...bodyGroup};
		this.router.navigate([`app/body-group/${bodyGroup.id}/view`]);
	}

	deleteBodyGroup(bodyGroup: BodyGroup) {
		this.deleteBodyGroupDialog = true;
		this.bodyGroup = {...bodyGroup};
	}

	confirmDelete() {
		if (this.bodyGroup.id !== undefined) {
			const subscription = this.bodyGroupService.destroy(this.bodyGroup.id).subscribe(
				response => {
					this.bodyGroups = this.bodyGroups.filter(val => val.id !== this.bodyGroup.id);
					this.toastService.showToast('success', 'Sucesso', 'Grupo muscular deletado', 3000);
					this.bodyGroup = {};
				},
				error => {
					this.toastService.showCrudAlerts(error.error.errors);
				}
			)
			this.subscriptions.push(subscription);
			this.deleteBodyGroupDialog = false;
		}
	}

	deleteSelectedBodyGroups() {
		this.deleteBodyGroupsDialog = true;
	}

	confirmDeleteSelected() {
		const selectedBodyGroupsIds = this.selectedBodyGroups.map(bodyGroup => bodyGroup.id as number);
		const subscription = this.bodyGroupService.massDelete({ ids: selectedBodyGroupsIds }).subscribe(
			response => {
				this.bodyGroups = this.bodyGroups.filter(val => !this.selectedBodyGroups.includes(val));
				this.selectedBodyGroups = [];
				this.toastService.showToast('success', 'Sucesso', 'Grupos musculares deletados', 3000);
			},
			error => {
				this.toastService.showCrudAlerts(error.error.errors);
			}
		);
		this.subscriptions.push(subscription);
		this.deleteBodyGroupsDialog = false;
	}

	onGlobalFilter(table: Table, event: Event) {
		table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
	}

}
