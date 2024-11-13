import { Injectable } from '@angular/core';
import { AppService } from "../../core/services/app.service";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";

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
}
