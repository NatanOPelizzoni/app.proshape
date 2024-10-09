import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "../../data/interfaces/user";

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(
		private http: HttpClient
	) {
	}

	getUsers() {
		return this.http.get<any>('assets/data/mocks/users.json')
			.toPromise()
			.then(res => res.data as User[])
			.then(data => data);
	}
}
