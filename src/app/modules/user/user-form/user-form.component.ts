import { ChangeDetectorRef, Component, OnDestroy, OnInit, AfterContentInit } from '@angular/core';
import { ButtonDirective } from "primeng/button";
import { Ripple } from "primeng/ripple";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { DropdownModule } from "primeng/dropdown";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { JsonPipe, NgIf } from "@angular/common";
import { UserService } from "../user.service";
import { HttpParams } from "@angular/common/http";
import { Subscription } from "rxjs";
import { PasswordModule } from "primeng/password";
import { PasswordValidator } from "../../../shared/Validators/password-validator";
import { DividerModule } from "primeng/divider";
import { MessageService } from "primeng/api";

@Component({
	selector: 'app-user-form',
	standalone: true,
	imports: [
		ToastModule,
		ToolbarModule,
		ButtonDirective,
		Ripple,
		InputTextModule,
		InputTextareaModule,
		DropdownModule,
		ReactiveFormsModule,
		JsonPipe,
		PasswordModule,
		NgIf,
		DividerModule
	],
	templateUrl: './user-form.component.html',
	styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit, OnDestroy, AfterContentInit {
	dropdownStatus = [
		{value: 'A', description: 'Ativo'},
		{value: 'I', description: 'Inativo'}
	];

	dropdownRoles = [
		{value: 'A', description: 'Admin'},
		{value: 'I', description: 'Instrutor'},
		{value: 'C', description: 'Cliente'}
	];

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
		private messageService: MessageService,
		public userService: UserService,
		public ref: ChangeDetectorRef,
	) {
	}

	ngOnInit() {
		this._configureActions();
		this._createForm();
		this._setReadonly();
	}

	ngOnDestroy() {
		this.subscriptions.forEach(element => element.unsubscribe());
	}

	ngAfterContentInit() {
		if (this.actionType !== 'create') {
			this._load();
		}
	}

	private _configureActions() {
		const path = this.route.snapshot.url[this.route.snapshot.url.length - 1].path;
		switch (path) {
			case 'create':
				this.headerTitle = 'Criar usuário';
				this.actionType = 'create';
				break;
			case 'view':
				this.headerTitle = 'Visualizar usuário';
				this.id = Number(this.route.snapshot.paramMap.get('id'));
				this.actionType = 'view';
				break;
			case 'update':
				this.headerTitle = 'Editar usuário';
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
				password: new FormControl(null, [Validators.required]),
				password_confirmation: new FormControl(null, [Validators.required]),
				status: new FormControl(null, [Validators.required]),
				role: new FormControl(null, [Validators.required]),
			},
			{
				validators: PasswordValidator.passwordsMatching
			});
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
			const subscription = this.userService.show(this.id, params).subscribe(
				response => {
					this.data = response;
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
			user_id: this.data.id,
			name: this.data.name,
			email: this.data.email,
			password: this.data.password,
			status: this.data.status,
			role: this.data.role,
		});

		this.ref.detectChanges();
	}

	save() {
		if (this.form.invalid) {
			return;
		}

		console.log(this.form.getRawValue());
		this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Usuário criado', life: 1000});
		setTimeout(() => {
			this.redirectToList();
		}, 1000);
	}

	redirectToList() {
		this.router.navigate(['app/user']);
	}

	redirectToEdit() {
		this.router.navigate(['app/user/' + this.id + '/update']);
	}
}
