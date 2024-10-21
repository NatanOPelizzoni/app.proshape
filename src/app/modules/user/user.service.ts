import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AppService } from "../../core/services/app.service";
import { Observable } from "rxjs";
import { User } from "../../data/interfaces/user";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class UserService extends AppService {

    constructor(
        http: HttpClient
    ) {
        super(http);
        this.route = 'assets/data/mocks/users.json';
    }

	getInstructors(): Observable<User[]> {
		return this.getAll().pipe(
			map((users: User[]) => users.filter(user => user.role === 'I'))
		);
	}
}
