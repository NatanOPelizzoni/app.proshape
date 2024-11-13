import { AfterContentInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { PrimeTemplate } from "primeng/api";
import { HttpParams } from "@angular/common/http";
import { BodyGroupService } from "../../body-group/body-group.service";
import { ExerciseService } from "../exercise.service";
import { ButtonDirective } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { NgIf } from "@angular/common";
import { Ripple } from "primeng/ripple";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { ToastService } from "../../../shared/services/toast.service";

@Component({
  selector: 'app-exercise-form',
  standalone: true,
	imports: [
		ButtonDirective,
		CalendarModule,
		DropdownModule,
		InputNumberModule,
		InputTextModule,
		NgIf,
		PrimeTemplate,
		ReactiveFormsModule,
		Ripple,
		ToastModule,
		ToolbarModule
	],
  templateUrl: './exercise-form.component.html',
  styleUrl: './exercise-form.component.scss'
})
export class ExerciseFormComponent implements OnInit, OnDestroy, AfterContentInit {
	dropdownStatus = [
		{value: 'A', description: 'Ativo'},
		{value: 'I', description: 'Inativo'}
	];

	dropdownBodyGroups: any = [];

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
		public exerciseService: ExerciseService,
		public bodyGroupService: BodyGroupService,
		public ref: ChangeDetectorRef,
	) {
	}

	ngOnInit() {
		this._configureActions();
		this._createForm();
		this._setReadonly();
		this._getBodyGroups();
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
		this.router.navigate(['app/exercise']);
	}

	redirectToEdit() {
		this.router.navigate(['app/exercise/' + this.id + '/update']);
	}

	private _configureActions() {
		const path = this.route.snapshot.url[this.route.snapshot.url.length - 1].path;
		switch (path) {
			case 'create':
				this.headerTitle = 'Criar exercício';
				this.actionType = 'create';
				break;
			case 'view':
				this.headerTitle = 'Visualizar exercício';
				this.id = Number(this.route.snapshot.paramMap.get('id'));
				this.actionType = 'view';
				break;
			case 'update':
				this.headerTitle = 'Editar exercício';
				this.id = Number(this.route.snapshot.paramMap.get('id'));
				this.actionType = 'update';
				break;
		}
	}

	private _createForm() {
		this.form = this.fb.group({
				id: new FormControl(this.id),
				name: new FormControl(null, [Validators.required]),
				status: new FormControl(null, [Validators.required]),
				body_group_id: new FormControl(null, [Validators.required]),
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
			const subscription = this.exerciseService.show(this.id, params).subscribe(
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
			exercise_id: this.data.id,
			name: this.data.name,
			status: this.data.status,
			body_group_id: this.data.body_group_id,
		});

		this.ref.detectChanges();
	}

	private _getBodyGroups() {
		const subscription = this.bodyGroupService.getBodyGroups(true).subscribe(bodyGroups => {
			this.dropdownBodyGroups = bodyGroups.map(bodyGroup => ({
				value: bodyGroup.id,
				description: bodyGroup.name
			}));
		});
		this.subscriptions.push(subscription);
	}

	private _store() {
		const subscription = this.exerciseService.store(this.form.value).subscribe(
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
			const subscription = this.exerciseService.update(this.id, this.form.value).subscribe(
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

}
