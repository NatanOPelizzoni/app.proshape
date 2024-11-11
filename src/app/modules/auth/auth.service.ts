import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../environments/environment";

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	protected readonly apiRoute = `${environment.apiUrl}`;

	private readonly routeLogout = `${this.apiRoute}/logout`;
	private readonly routeForgotPassword = `${this.apiRoute}/forgot_password`;

	constructor(
		private http: HttpClient,
		private router: Router,
		private route: ActivatedRoute
	) {
	}

	login(body: any) {
		return this.http.post<any>(`${this.apiRoute}/login`, body);
	}

	forgotPassword(body: any) {
		return this.http.post<any>(this.routeForgotPassword, body);
	}

	logout() {
		localStorage.removeItem('_proshapetoken');
		localStorage.removeItem('_proshapelogged');
	}

	setToken(token: any) {
		localStorage.setItem('_proshapetoken', JSON.stringify(token));
	}

	getToken() {
		const token = localStorage.getItem('_proshapetoken');
		return token ? JSON.parse(token) : null;
	}

	getStringToken() {
		const token = this.getToken();
		return `Bearer ${token}`;
	}

	getDataLogged() {
		const sessionLogged = sessionStorage.getItem('_proshapelogged');
		if (sessionLogged) {
			const oLogged = JSON.parse(sessionLogged);
			if (oLogged.url === window.location.href) {
				return oLogged;
			}
		}

		const localLogged = localStorage.getItem('_proshapelogged');
		return localLogged ? JSON.parse(localLogged) : null;
	}

	getUserIDLogged(): number {
		const auth = this.getDataLogged();
		return auth !== undefined && auth !== null ? auth.id : null;
	}

	getApiRoute() {
		return this.apiRoute;
	}

	configureRoute(route: string): string {
		return `${this.apiRoute}/${route}`;
	}
}
