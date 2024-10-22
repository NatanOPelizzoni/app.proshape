import { AfterContentInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService, PrimeTemplate } from "primeng/api";
import { PasswordValidator } from "../../../shared/Validators/password-validator";
import { HttpParams } from "@angular/common/http";
import { ButtonDirective } from "primeng/button";
import { DividerModule } from "primeng/divider";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { NgIf } from "@angular/common";
import { PasswordModule } from "primeng/password";
import { Ripple } from "primeng/ripple";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { BodyGroupService } from "../body-group.service";

@Component({
  selector: 'app-body-group-form',
  standalone: true,
	imports: [
		ButtonDirective,
		DividerModule,
		DropdownModule,
		InputTextModule,
		NgIf,
		PasswordModule,
		PrimeTemplate,
		ReactiveFormsModule,
		Ripple,
		ToastModule,
		ToolbarModule
	],
  templateUrl: './body-group-form.component.html',
  styleUrl: './body-group-form.component.scss'
})
export class BodyGroupFormComponent implements OnInit, OnDestroy, AfterContentInit {
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
		public bodyGroupService: BodyGroupService,
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
				this.headerTitle = 'Criar grupo muscular';
				this.actionType = 'create';
				break;
			case 'view':
				this.headerTitle = 'Visualizar grupo muscular';
				this.id = Number(this.route.snapshot.paramMap.get('id'));
				this.actionType = 'view';
				break;
			case 'update':
				this.headerTitle = 'Editar grupo muscular';
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
			const subscription = this.bodyGroupService.show(this.id, params).subscribe(
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
			body_group_id: this.data.id,
			name: this.data.name,
			status: this.data.status
		});

		this.ref.detectChanges();
	}

	save() {
		if (this.form.invalid) {
			return;
		}

		console.log(this.form.getRawValue());
		this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Grupo muscular criado', life: 1000});
		setTimeout(() => {
			this.redirectToList();
		}, 1000);
	}

	redirectToList() {
		this.router.navigate(['app/body-group']);
	}

	redirectToEdit() {
		this.router.navigate(['app/body-group/' + this.id + '/update']);
	}

}
