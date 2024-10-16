import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../../data/interfaces/user";

@Injectable({
	providedIn: 'root'
})
export class AppService {
	private _params: HttpParams = new HttpParams();
	private _route: string = '';

	constructor(
		public http: HttpClient,
	) {
	}

	get route(): string {
		return this._route;
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
		return this.http.get<any>('assets/data/mocks/users.json')
			.toPromise()
			.then(res => res.data as User[])
			.then(data => data);

		// return this.get<any>(this.route, {params: params}).pipe(
		// 	map(response => {
		// 		return response.data;
		// 	})
		// );
	}

	show(id: number | string, params?: HttpParams) {
		return this.http.get<any>('assets/data/mocks/users.json').pipe(
			map(res => res.data as User[]),
			map(data => data.find(user => user.id === id))
		);

		// return this.get<any>(`${this.route}/${id}`, {params: params});
	}

	store(body: any, params: any = null) {
		//Todo: implement store
	}

	update(id: number | string, body: any, params: any = null) {
		//Todo: implement update
	}

	massDelete(body: any, params: any = null) {
		//Todo: implement mass delete
	}

	patch<T>(url: string, body: any | null, options: any = null): Observable<any> {
		return this.http.patch<T>(url, body, options);
	}

	post<T>(url: string, body: any | null, options: any = null): Observable<any> {
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
