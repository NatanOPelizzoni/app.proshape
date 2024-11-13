import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NgIf, NgOptimizedImage } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { PasswordModule } from "primeng/password";
import { Ripple } from "primeng/ripple";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";
import { ToastModule } from "primeng/toast";
import { ToastService } from "../../../shared/services/toast.service";

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		NgOptimizedImage,
		ButtonModule,
		CheckboxModule,
		InputTextModule,
		FormsModule,
		PasswordModule,
		Ripple,
		RouterLink,
		ReactiveFormsModule,
		NgIf,
		ToastModule
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
	password!: string;

	form!: FormGroup;

	private subscriptions: Subscription[] = [];

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private toastService: ToastService,
		private authService: AuthService,
		public ref: ChangeDetectorRef,
	) {
	}

	ngOnInit() {
		this._createForm();
	}

	ngOnDestroy() {
		this.subscriptions.forEach(element => element.unsubscribe());
	}

	private _createForm() {
		this.form = this.fb.group({
				email: new FormControl(null, [Validators.required]),
				password: new FormControl(null, [Validators.required]),
			}
		);
	}

	login() {
		if (this.form.valid) {
			this.subscriptions.push(
				this.authService.login(this.form.value).subscribe(
					(response: any) => {
						this.authService.setToken(response.success.token);
						this.router.navigate(['/app']); //TODO: redirect to the dashboard page
					},
					(error: any) => {
						if (error.status === 401 && error.error.message === 'Unauthorised') {
							this.toastService.showToast('error', 'Erro', 'Usuário ou senha inválidos');
						}
					}
				)
			);
		}
	}
}
