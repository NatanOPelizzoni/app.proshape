import { Injectable } from '@angular/core';
import { AppService } from "../../core/services/app.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
	providedIn: 'root'
})
export class BodyGroupService extends AppService {

	constructor(
		http: HttpClient
	) {
		super(http);
		this.route = 'assets/data/mocks/body-groups.json';
	}
}
