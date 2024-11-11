import { Component, OnDestroy, OnInit } from '@angular/core';
import { PrimeTemplate } from "primeng/api";
import { Router } from "@angular/router";
import { Table, TableModule } from "primeng/table";
import { ButtonDirective } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { NgIf } from "@angular/common";
import { Ripple } from "primeng/ripple";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { Exercise } from "../../data/interfaces/exercise";
import { ExerciseService } from "./exercise.service";
import { BodyGroup } from "../../data/interfaces/body-group";
import { BodyGroupService } from "../body-group/body-group.service";
import { Subscription } from "rxjs";
import { ToastService } from "../../shared/services/toast.service";

@Component({
	selector: 'app-exercise',
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
	templateUrl: './exercise.component.html',
	styleUrl: './exercise.component.scss'
})
export class ExerciseComponent implements OnInit, OnDestroy {

	subscriptions: Subscription[] = [];

	deleteExerciseDialog: boolean = false;

	deleteExercisesDialog: boolean = false;

	exercises: Exercise[] = [];

	exercise: Exercise = {};

	selectedExercises: Exercise[] = [];

	cols: any[] = [];

	bodyGroups: BodyGroup[] = [];

	rowsPerPageOptions = [5, 10, 20];

	constructor(
		private exerciseService: ExerciseService,
		private bodyGroupService: BodyGroupService,
		private toastService: ToastService,
		private router: Router,
	) {
		this._getBodyGroups();
	}

	ngOnInit() {
		this.exerciseService.getAll().subscribe((data: Exercise[]) => this.exercises = data);

		this.cols = [
			{field: 'id', header: 'ID'},
			{field: 'name', header: 'Nome'},
			{field: 'status', header: 'Status'},
			{field: 'bodyGroup', header: 'Grupo Muscular'},
		];

		this._loadFixedValues();
	}

	ngOnDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	openNew() {
		this.router.navigate([`app/exercise/create`]);
	}

	editExercise(exercise: Exercise) {
		this.exercise = {...exercise};
		this.router.navigate([`app/exercise/${exercise.id}/update`]);
	}

	viewExercise(exercise: Exercise) {
		this.exercise = {...exercise};
		this.router.navigate([`app/exercise/${exercise.id}/view`]);
	}

	deleteExercise(exercise: Exercise) {
		this.deleteExerciseDialog = true;
		this.exercise = {...exercise};
	}

	confirmDelete() {
		this.deleteExerciseDialog = false;
		this.exercises = this.exercises.filter(val => val.id !== this.exercise.id);
		this.toastService.showToast('success', 'Sucesso', 'Exercício deletado', 3000);
		this.exercise = {};
	}

	deleteSelectedExercises() {
		this.deleteExercisesDialog = true;
	}

	confirmDeleteSelected() {
		this.deleteExercisesDialog = false;
		this.exercises = this.exercises.filter(val => !this.selectedExercises.includes(val));
		this.toastService.showToast('success', 'Sucesso', 'Exercícios deletados', 3000);
		this.selectedExercises = [];
	}

	onGlobalFilter(table: Table, event: Event) {
		table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
	}

	getBodyGroup(id: number) {
		// TODO: AJEITAR ESSA FUNÇÃO PARA QUE TRAGA O NOME DO CORPO MUSCULAR DIRETO NA REQUEST
		//  // POIS ASSIM COMO TA EXECUTA VARIAS VEZES POR ESTAR SENDO CHAMADO DENTRO DO HTML
		return this.bodyGroups.find(bodyGroup => bodyGroup.id === id)?.name;
	}

	private _loadFixedValues() {
		this.exercises.forEach(exercise => {
			if (exercise.body_group_id !== undefined) {
				exercise.body_group_description = this.getBodyGroup(exercise.body_group_id);
			} else {
				exercise.body_group_description = ''; // or some default value
			}
		});
	}

	private _getBodyGroups() {
		const subscription = this.bodyGroupService.getBodyGroups().subscribe(bodyGroups => {
			this.bodyGroups = bodyGroups;
			this.exerciseService.getAll().subscribe((data: Exercise[]) => {
				this.exercises = data;
				this._loadFixedValues();
			});
		});
		this.subscriptions.push(subscription);
	}
}
