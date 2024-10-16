import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AppService } from "../../core/services/app.service";

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
}
