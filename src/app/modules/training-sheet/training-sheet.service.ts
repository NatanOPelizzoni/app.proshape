import { Injectable } from '@angular/core';
import { AppService } from "../../core/services/app.service";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TrainingSheetService extends AppService {

	constructor(
		http: HttpClient,
		authService: AuthService
	) {
		super(http, authService);
		this.route = 'training-sheet';
	}

	generateTrainingSheet(clientId: number): Observable<any> {
		return this.post<any>(`${this.route}/generate`, { client_id: clientId }).pipe(
			map((response: any) => response.data)
		);
	}
}
