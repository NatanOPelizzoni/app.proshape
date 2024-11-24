import { Injectable } from '@angular/core';
import { AppService } from "../../core/services/app.service";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Exercise } from "../../data/interfaces/exercise";

@Injectable({
	providedIn: 'root'
})
export class ExerciseService extends AppService {

	constructor(
		http: HttpClient,
		authService: AuthService
	) {
		super(http, authService);
		this.route = 'exercise';
	}

	getExercises(returnActives: boolean = false): Observable<Exercise[]> {
		return this.getAll().pipe(
			map((exercises: Exercise[]) => exercises.filter((exercise) => {
				if (returnActives) {
					return exercise.status === 'A';
				} else {
					return true;
				}
			}))
		);
	}
}
