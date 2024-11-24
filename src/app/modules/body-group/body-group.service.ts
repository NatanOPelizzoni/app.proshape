import { Injectable } from '@angular/core';
import { AppService } from "../../core/services/app.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../../data/interfaces/user";
import { map } from "rxjs/operators";
import { BodyGroup } from "../../data/interfaces/body-group";
import { AuthService } from "../auth/auth.service";

@Injectable({
	providedIn: 'root'
})
export class BodyGroupService extends AppService {

	constructor(
		http: HttpClient,
		authService: AuthService
	) {
		super(http, authService);
		this.route = 'body-group';
	}

	getBodyGroups(returnActives: boolean = false): Observable<User[]> {
		return this.getAll().pipe(
			map((bodyGroups: BodyGroup[]) => bodyGroups.filter((bodyGroup) => {
				if (returnActives) {
					return bodyGroup.status === 'A';
				} else {
					return true;
				}
			}))
		);
	}
}
