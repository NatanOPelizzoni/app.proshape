import { Component } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from "@angular/forms";
import { PasswordModule } from "primeng/password";
import { Ripple } from "primeng/ripple";
import { RouterLink } from "@angular/router";

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
		RouterLink
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {

	password!: string;
}
