import { AfterContentInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { forkJoin, Subscription, tap } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastService } from "../../../shared/services/toast.service";
import { HttpParams } from "@angular/common/http";
import { ClientService } from "../../client/client.service";
import { TrainingSheetService } from "../training-sheet.service";
import { ButtonDirective } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { NgIf } from "@angular/common";
import { PrimeTemplate } from "primeng/api";
import { Ripple } from "primeng/ripple";
import { ToolbarModule } from "primeng/toolbar";
import { CalendarModule } from "primeng/calendar";
import { Table, TableModule } from "primeng/table";
import { TooltipModule } from 'primeng/tooltip';
import { TrainingSheetExercise } from "../../../data/interfaces/training-sheet-exercise";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { ExerciseService } from "../../exercise/exercise.service";
import { BodyGroupService } from "../../body-group/body-group.service";
import { DialogModule } from "primeng/dialog";
import { InputNumberModule } from "primeng/inputnumber";

@Component({
	selector: 'app-training-sheet-form',
	standalone: true,
	imports: [
		ButtonDirective,
		DropdownModule,
		InputTextModule,
		NgIf,
		PrimeTemplate,
		ReactiveFormsModule,
		Ripple,
		ToolbarModule,
		CalendarModule,
		TableModule,
		TooltipModule,
		FaIconComponent,
		DialogModule,
		InputNumberModule
	],
	templateUrl: './training-sheet-form.component.html',
	styleUrl: './training-sheet-form.component.scss'
})
export class TrainingSheetFormComponent implements OnInit, OnDestroy, AfterContentInit {
	dropdownStatus = [
		{value: 'A', description: 'Ativo'},
		{value: 'I', description: 'Inativo'}
	];
	dropdownClients: any = [];
	dropdownExercises: any = [];

	bodyGroups: { [key: number]: string } = {};

	id: number | null = null;
	form!: FormGroup;
	modalForm!: FormGroup;
	readonly: boolean = false;
	data: any = null;
	headerTitle: string = '';
	actionType: string = 'create';

	exercises: TrainingSheetExercise[] = [];
	exercise: TrainingSheetExercise = {};
	selectedExercises: TrainingSheetExercise[] = [];

	deleteExerciseDialog: boolean = false;
	deleteExercisesDialog: boolean = false;

	cols: any[] = [];
	rowsPerPageOptions = [5, 10, 20];

	submitted: boolean = false;
	exerciseDialog: boolean = false;

	private subscriptions: Subscription[] = [];

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private toastService: ToastService,
		private trainingSheet: TrainingSheetService,
		private clientService: ClientService,
		private bodyGroupService: BodyGroupService,
		private exerciseService: ExerciseService,
		public ref: ChangeDetectorRef,
	) {
		this._initializeData();
	}

	ngOnInit() {
		this.cols = [
			{field: 'exercise_description', header: 'Nome'},
			{field: 'body_group_description', header: 'Grupo Muscular'},
			{field: 'series', header: 'Nº de séries'},
			{field: 'repetitions', header: 'Nº de repetições'},
			{field: 'weight', header: 'Peso'},
			{field: 'order', header: 'Ordem'},
		];
		this._configureActions();
		this._createForm();
		this._setReadonly();
	}

	ngOnDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	ngAfterContentInit() {
		if (this.actionType !== 'create') {
			this._load();
		}
	}

	save() {
		if (this.form.invalid) {
			this.toastService.showToast('warn', 'Atenção', 'Formulário inválido');
			return;
		}

		if (this.actionType === 'create') {
			this._store();
		} else {
			this._update();
		}
	}

	redirectToList() {
		this.router.navigate(['app/training-sheet']);
	}

	redirectToEdit() {
		this.router.navigate(['app/training-sheet/' + this.id + '/update']);
	}

	onGlobalFilter(table: Table, event: Event) {
		table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
	}

	editTrainingSheetExercise(exercise: TrainingSheetExercise) {
		this.exercise = {...exercise};
		this.modalForm.patchValue(this.exercise);
		this.exerciseDialog = true;
	}

	openRemoveExerciseDialog(exercise: TrainingSheetExercise) {
		this.exercise = {...exercise};
		this.deleteExerciseDialog = true;
	}

	confirmRemoveExercise(exercise: TrainingSheetExercise) {
		if (exercise.control_id) {
			this.exercises = this.exercises.filter(ex => ex.control_id !== exercise.control_id);
		} else {
			this.exercises = this.exercises.filter(ex => ex.exercise_id !== exercise.exercise_id);
		}
		this._updateFormExercises();
		this.deleteExerciseDialog = false;
		this.toastService.showToast('success', 'Sucesso', 'Exercício removido', 3000);
	}

	openRemoveSelectedExercisesDialog() {
		this.deleteExercisesDialog = true;
	}

	confirmRemoveSelectedExercise() {
		if (this.selectedExercises && this.selectedExercises.length) {
			this.selectedExercises.forEach(selectedExercise => {
				if (selectedExercise.control_id) {
					this.exercises = this.exercises.filter(ex => ex.control_id !== selectedExercise.control_id);
				} else {
					this.exercises = this.exercises.filter(ex => ex.exercise_id !== selectedExercise.exercise_id);
				}
			});
			this._updateFormExercises();
			this.toastService.showToast('success', 'Sucesso', 'Exercícios selecionados excluídos', 3000);
			this.selectedExercises = [];
			this.deleteExercisesDialog = false;
		}
	}

	hideDialog() {
		this.exerciseDialog = false;
		this.submitted = false;
		this.modalForm.reset();
	}

	saveExercise() {
		this.submitted = true;

		if (this.modalForm.invalid) {
			return;
		}

		const updatedExercise = this.modalForm.value;
		updatedExercise.control_id = this.exercise.control_id;

		const exerciseDropdown = this.dropdownExercises.find((e: any) => e.value === updatedExercise.exercise_id);
		if (exerciseDropdown) {
			updatedExercise.exercise_description = exerciseDropdown.description;
			updatedExercise.body_group_description = this.bodyGroups[exerciseDropdown.body_group_id] || '';
		} else {
			updatedExercise.exercise_description = '';
			updatedExercise.body_group_description = '';
		}

		const exerciseIndex = this.exercises.findIndex(ex => ex.control_id === updatedExercise.control_id);

		let toastMessage = 'Exercício adicionado';
		if (exerciseIndex !== -1) {
			this.exercises[exerciseIndex] = { ...updatedExercise };
			toastMessage = 'Exercício atualizado';
		} else {
			this.exercises.push(updatedExercise);
		}

		this.exercises = [...this.exercises];
		this._updateFormExercises();

		this.toastService.showToast('success', 'Sucesso', toastMessage, 3000);

		this.exerciseDialog = false;
		this.submitted = false;
		this.modalForm.reset();
	}

	openNewExerciseModal() {
		const maxControlId = this.exercises.length > 0 ? Math.max(...this.exercises.map(ex => ex.control_id || 0)) : 0;
		this.exercise = { control_id: maxControlId + 1 }; // Assign a unique control_id
		this.submitted = false;
		this.exerciseDialog = true;
	}

	generateTrainingSheetWithAI() {
		// TODO: Implementar lógica para gerar ficha de treino com IA
	}

	private _initializeData() {
		forkJoin({
			clients: this._getClients(),
			exercises: this._getExercises(),
			bodyGroups: this._getBodyGroups()
		}).subscribe(() => {
			this._loadFixedValues();
		});
	}

	private _configureActions() {
		const path = this.route.snapshot.url[this.route.snapshot.url.length - 1].path;
		switch (path) {
			case 'create':
				this.headerTitle = 'Criar ficha de treino';
				this.actionType = 'create';
				break;
			case 'view':
				this.headerTitle = 'Visualizar ficha de treino';
				this.id = Number(this.route.snapshot.paramMap.get('id'));
				this.actionType = 'view';
				break;
			case 'update':
				this.headerTitle = 'Editar ficha de treino';
				this.id = Number(this.route.snapshot.paramMap.get('id'));
				this.actionType = 'update';
				break;
		}
	}

	private _createForm() {
		this.form = this.fb.group(
			{
				id: new FormControl(this.id),
				client_id: new FormControl(null, [Validators.required]),
				start_date: new FormControl(null, [Validators.required]),
				end_date: new FormControl(null, [Validators.required]),
				status: new FormControl(null, [Validators.required]),
				exercises: new FormControl(null, [Validators.required]),
			}
		);

		this.modalForm = this.fb.group(
			{
				exercise_id: new FormControl(null, [Validators.required]),
				series: new FormControl(null, [Validators.required]),
				repetitions: new FormControl(null, [Validators.required]),
				weight: new FormControl(null),
				order: new FormControl(null),
			}
		);
	}

	private _setReadonly() {
		switch (this.actionType) {
			case 'create':
				this.readonly = false;
				break;
			case 'update':
				this.readonly = false;
				break;
			case 'view':
				this.readonly = true;
				break;
		}
	}

	private _load() {
		if (this.id !== undefined && this.id !== null) {
			let params = new HttpParams();
			const subscription = this.trainingSheet.show(this.id, params).subscribe(
				response => {
					this.data = response.data;
					this._loadFixedValues();
				}
			);
			this.subscriptions.push(subscription);
		}
	}

	private _populate() {
		if (!this.data) {
			return;
		}

		this.form.patchValue({
			training_sheet_id: this.data.id,
			client_id: this.data.client_id,
			start_date: this.data.start_date,
			end_date: this.data.end_date,
			status: this.data.status,
			exercises: this.data.exercises
		});

		this.ref.detectChanges();
	}

	private _getClients() {
		return this.clientService.getClients(true).pipe(
			tap(client => {
				this.dropdownClients = client.map(client => ({
					value: client.id,
					description: client.name
				}));
			})
		);
	}

	private _getExercises() {
		return this.exerciseService.getExercises(true).pipe(
			tap(exercise => {
				this.dropdownExercises = exercise.map(exercise => ({
					value: exercise.id,
					description: exercise.name,
					body_group_id: exercise.body_group_id
				}));
			})
		);
	}

	private _getBodyGroups() {
		return this.bodyGroupService.getBodyGroups().pipe(
			tap(bodyGroups => {
				this.bodyGroups = bodyGroups.reduce((acc, bodyGroup) => {
					if (bodyGroup.id !== undefined) {
						acc[bodyGroup.id] = bodyGroup.name ?? '';
					}
					return acc;
				}, {} as { [key: number]: string });
			})
		);
	}

	private _store() {
		const subscription = this.trainingSheet.store(this.form.value).subscribe(
			response => {
				this.id = response.data.id;
				this.toastService.showToast('success', 'Sucesso', 'Exercício criado');
				setTimeout(() => {
					this.redirectToList();
				}, 1000);
			},
			error => {
				this.toastService.showCrudAlerts(error.error.errors);
			}
		);
		this.subscriptions.push(subscription);
	}

	private _update() {
		if (this.id !== null) {
			const subscription = this.trainingSheet.update(this.id, this.form.value).subscribe(
				response => {
					this.toastService.showToast('success', 'Sucesso', 'Exercício atualizado');
					setTimeout(() => {
						this.redirectToList();
					}, 1000);
				},
				error => {
					this.toastService.showCrudAlerts(error.error.errors);
				}
			);
			this.subscriptions.push(subscription);
		} else {
			this.toastService.showToast('error', 'Erro', 'Houve um erro ao pegar o id do exercício');
		}
	}

	private _loadFixedValues() {
		if (this.data) {
			this.data.start_date = new Date(this.data.start_date);
			this.data.end_date = new Date(this.data.end_date);

			if (typeof this.data.exercises === 'string') {
				try {
					this.exercises = JSON.parse(this.data.exercises);
				} catch (e) {
					console.error('Erro ao converter exercícios:', e);
					this.exercises = [];
				}
			} else {
				this.exercises = Array.isArray(this.data.exercises) ? this.data.exercises : [];
			}

			// Generate a unique control_id for exercises without one
			let maxControlId = this.exercises.length > 0 ? Math.max(...this.exercises.map(ex => ex.control_id || 0)) : 0;
			this.exercises.forEach(exercise => {
				if (!exercise.control_id) {
					exercise.control_id = ++maxControlId;
				}
				const exerciseDropdown = this.dropdownExercises.find((e: any) => e.value === exercise.exercise_id);
				if (exerciseDropdown) {
					exercise.exercise_description = exerciseDropdown.description;
					exercise.body_group_description = this.bodyGroups[exerciseDropdown.body_group_id] || '';
				} else {
					exercise.exercise_description = '';
					exercise.body_group_description = '';
				}
			});
		}

		this._populate();
	}

	private _updateFormExercises() {
		this.form.patchValue({
			exercises: JSON.stringify(this.exercises)
		});
	}
}
