import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "../../modules/auth/auth.service";

@Injectable({
	providedIn: 'root'
})
export class AppService {
	private _route: string;
	private _params: HttpParams;

	constructor(
		public http: HttpClient,
		public authService: AuthService
	) {
		this._route = '';
		this._params = new HttpParams();
	}

	get route(): string {
		return this.authService.configureRoute(this._route);
	}

	set route(value: string) {
		this._route = value;
	}

	get params(): HttpParams {
		return this._params;
	}

	set params(value: HttpParams) {
		this._params = value;
	}

	getAll(params?: HttpParams) {
		return this.get<any>(this.route, {params: params}).pipe(
			map(response => {
				return response.data;
			})
		);
	}

	show(id: number | string, params?: HttpParams) {
		return this.get<any>(`${this.route}/${id}`, {params: params});
	}

	store(body: any, params: any = null) {
		return this.post<any>(this.route, body, {params: params});
	}

	update(id: number | string, body: any, params: any = null) {
		return this.patch<any>(`${this.route}/${id}`, body, {params: params});
	}

	destroy(id: number | string, params: any = null) {
		return this.delete<any>(`${this.route}/${id}`, {params: params});
	}

	massDelete(body: { ids: number[] }, params: any = null) {
		return this.post<any>(`${this.route}/massdelete`, body, {params: params});
	}

	patch<T>(url: string, body: any | null, options: any = null): Observable<any> {
		return this.http.patch<T>(url, body, options);
	}

	post<T>(url: string, body: any | null, options: any = {}): Observable<any> {
		return this.http.post<any>(url, body, options);
	}

	put<T>(url: string, body: any | null, options: any = null): Observable<any> {
		return this.http.put<any>(url, body, options);
	}

	get<T>(url: string, options: any = null): Observable<any> {
		return this.http.get<any>(url, options);
	}

	delete<T>(url: string, options: any = null): Observable<any> {
		return this.http.delete<any>(url, options);
	}
}
