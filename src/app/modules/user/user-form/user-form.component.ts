import { Component, OnInit } from '@angular/core';
import { ButtonDirective } from "primeng/button";
import { Ripple } from "primeng/ripple";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { DropdownModule } from "primeng/dropdown";
import { RouterLink } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { JsonPipe } from "@angular/common";

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
		RouterLink,
		ReactiveFormsModule,
		JsonPipe
	],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit{
	dropdownStatus = [
		{ code: 'A', value: 'Ativo' },
		{ code: 'I', value: 'Inativo' }
	];

	dropdownRoles = [
		{ code: 1, value: 'Admin' },
		{ code: 2, value: 'Instrutor' },
		{ code: 3, value: 'Cliente' }
	];

	userForm!: FormGroup;

	constructor(
		private fb: FormBuilder
	) {
	}

	ngOnInit() {
		this._createForm();
	}

	private _createForm() {
		this.userForm = this.fb.group({
			id: ['', []],
			name: ['', [Validators.required]],
			email: ['', [Validators.required]],
			password: ['', [Validators.required]],
			active: ['', [Validators.required]],
			role: ['', [Validators.required]],
		});
	}

	save() {
		console.log(this.userForm.invalid)
		console.log(this.userForm?.getRawValue());
	}
}
