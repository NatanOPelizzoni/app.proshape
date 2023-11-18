import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import { RegisterRequest } from 'src/app/data/interfaces/register/register-request';
import { RegisterResponse } from 'src/app/data/interfaces/register/register-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) { }

  register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/auth/register`, registerRequest).pipe(
      tap(
        (res: RegisterResponse) => this.snackBar.open(
          `User created successfully`,
          'Close',
          {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          }
        )
      )
    )
  }
}
