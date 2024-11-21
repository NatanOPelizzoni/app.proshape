import { Injectable } from '@angular/core';
import { AppService } from "../../core/services/app.service";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { Observable } from "rxjs";
import { User } from "../../data/interfaces/user";
import { map } from "rxjs/operators";
import { BodyGroup } from "../../data/interfaces/body-group";
import { Client } from "../../data/interfaces/client";

@Injectable({
	providedIn: 'root'
})
export class ClientService extends AppService {

	constructor(
		http: HttpClient,
		authService: AuthService
	) {
		super(http, authService);
		this.route = 'client';
	}

	getClients(returnActives: boolean = false): Observable<User[]> {
		return this.getAll().pipe(
			map((clients: Client[]) => clients.filter((client) => {
				if (returnActives) {
					return client.status === 'A';
				} else {
					return true;
				}
			}))
		);
	}
}
