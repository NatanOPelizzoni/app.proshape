import { AfterContentInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonDirective } from "primeng/button";
import { DividerModule } from "primeng/divider";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { NgIf } from "@angular/common";
import { PaginatorModule } from "primeng/paginator";
import { PasswordModule } from "primeng/password";
import { PrimeTemplate } from "primeng/api";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Ripple } from "primeng/ripple";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { ClientService } from "../client.service";
import { HttpParams } from "@angular/common/http";
import { CalendarModule } from "primeng/calendar";
import { UserService } from "../../user/user.service";
import { ToastService } from "../../../shared/services/toast.service";

@Component({
	selector: 'app-client-form',
	standalone: true,
	imports: [
		ButtonDirective,
		DividerModule,
		DropdownModule,
		InputTextModule,
		NgIf,
		PaginatorModule,
		PasswordModule,
		PrimeTemplate,
		ReactiveFormsModule,
		Ripple,
		ToastModule,
		ToolbarModule,
		CalendarModule
	],
	templateUrl: './client-form.component.html',
	styleUrl: './client-form.component.scss'
})
export class ClientFormComponent implements OnInit, OnDestroy, AfterContentInit {
	dropdownStatus = [
		{value: 'A', description: 'Ativo'},
		{value: 'I', description: 'Inativo'}
	];

	dropdownInstructors: any = [];

	id: number | null = null;
	form!: FormGroup;
	readonly: boolean = false;
	data: any = null;
	headerTitle: string = '';
	actionType: string = 'create';

	private subscriptions: Subscription[] = [];

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private toastService: ToastService,
		public clientService: ClientService,
		public userService: UserService,
		public ref: ChangeDetectorRef,
	) {
	}

	ngOnInit() {
		this._configureActions();
		this._createForm();
		this._setReadonly();
		this._getInstructors();
	}

	ngOnDestroy() {
		this.subscriptions.forEach(element => element.unsubscribe());
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
		this.router.navigate(['app/client']);
	}

	redirectToEdit() {
		this.router.navigate(['app/client/' + this.id + '/update']);
	}

	private _configureActions() {
		const path = this.route.snapshot.url[this.route.snapshot.url.length - 1].path;
		switch (path) {
			case 'create':
				this.headerTitle = 'Criar cliente';
				this.actionType = 'create';
				break;
			case 'view':
				this.headerTitle = 'Visualizar cliente';
				this.id = Number(this.route.snapshot.paramMap.get('id'));
				this.actionType = 'view';
				break;
			case 'update':
				this.headerTitle = 'Editar cliente';
				this.id = Number(this.route.snapshot.paramMap.get('id'));
				this.actionType = 'update';
				break;
		}
	}

	private _createForm() {
		this.form = this.fb.group({
				id: new FormControl(this.id),
				name: new FormControl(null, [Validators.required]),
				email: new FormControl(null, [Validators.required]),
				status: new FormControl(null, [Validators.required]),
				birth_date: new FormControl(null, [Validators.required]),
				weight: new FormControl(null, [Validators.required]),
				height: new FormControl(null, [Validators.required]),
				fitness_goals: new FormControl(null, [Validators.required]),
				training_frequency: new FormControl(null, [Validators.required]),
				health_restrictions: new FormControl(null, []),
				preferred_workout_type: new FormControl(null, [Validators.required]),
				exercise_history: new FormControl(null, [Validators.required]),
				current_fitness_level: new FormControl(null, [Validators.required]),
				injuries_or_surgeries: new FormControl(null, []),
				instructor_id: new FormControl(null, [Validators.required]),
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
			const subscription = this.clientService.show(this.id, params).subscribe(
				response => {
					this.data = response.data;
					this._populate();
				}
			);
			this.subscriptions.push(subscription);
		}
	}

	private _populate() {
		if (this.data === null || this.data === undefined) {
			return;
		}

		this.form.patchValue({
			client_id: this.data.id,
			name: this.data.name,
			email: this.data.email,
			status: this.data.status,
			birth_date: this.data.birth_date,
			weight: this.data.weight,
			height: this.data.height,
			fitness_goals: this.data.fitness_goals,
			training_frequency: this.data.training_frequency,
			health_restrictions: this.data.health_restrictions,
			preferred_workout_type: this.data.preferred_workout_type,
			exercise_history: this.data.exercise_history,
			current_fitness_level: this.data.current_fitness_level,
			injuries_or_surgeries: this.data.injuries_or_surgeries,
			instructor_id: this.data.instructor_id,
		});

		this.ref.detectChanges();
	}

	private _getInstructors() {
		const subscription = this.userService.getInstructors().subscribe(instructors => {
			this.dropdownInstructors = instructors.map(instructor => ({
				value: instructor.id,
				description: instructor.name
			}));
		});
		this.subscriptions.push(subscription);
	}

	private _store() {
		const subscription = this.clientService.store(this.form.value).subscribe(
			response => {
				this.id = response.data.id;
				this.toastService.showToast('success', 'Sucesso', 'Cliente criado');
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
			const subscription = this.clientService.update(this.id, this.form.value).subscribe(
				response => {
					this.toastService.showToast('success', 'Sucesso', 'Cliente atualizado');
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
			this.toastService.showToast('error', 'Erro', 'Houve um erro ao pegar o id do cliente');
		}
	}
}
