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
import { JsonPipe } from "@angular/common";
import { UserService } from "../user.service";
import { HttpParams } from "@angular/common/http";
import { Subscription } from "rxjs";

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
		JsonPipe
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
		{value: 1, description: 'Admin'},
		{value: 2, description: 'Instrutor'},
		{value: 3, description: 'Cliente'}
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
			status: new FormControl(null, [Validators.required]),
			role_id: new FormControl(null, [Validators.required]),
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
		console.log(this.data);

		this.form.patchValue({
			user_id: this.data.id,
			name: this.data.name,
			email: this.data.email,
			password: this.data.password,
			status: this.data.status,
			role_id: this.data.role_id,
		});

		this.ref.detectChanges();
	}

	backToList(event: MouseEvent) {
		switch (event.type) {
			case 'click':
				this.router.navigate(['app/user']);
				break;
		}
	}

	save() {
		console.log(this.form.invalid)
		console.log(this.form?.getRawValue());
	}
}
