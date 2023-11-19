import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import { RegisterRequest } from 'src/app/data/interfaces/register/register-request';
import { RegisterResponse } from 'src/app/data/interfaces/register/register-response';
import { environment } from 'src/app/data/constants/environment';
import { globals } from 'src/app/data/globals/globals';
import { LoginRequest } from 'src/app/data/interfaces/login/login-request';
import { LoginResponse } from 'src/app/data/interfaces/login/login-response';

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

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, loginRequest).pipe(
      tap(
        (response: LoginResponse) => {
          localStorage.setItem(environment.LOCALSTORAGE_TOKEN_KEY, response.token);
          localStorage.setItem(environment.LOCALSTORAGE_TOKEN_TYPE, response.token_type);
          globals.isLogged = true;
        }
      ),
      tap(
        () => this.snackBar.open(
          'Login Successfull',
          'Close',
          {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          }
        )
      )
    );
  }
}
