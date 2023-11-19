import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoginRequest } from 'src/app/data/interfaces/login/login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hidePassword = true;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  login() {
    if (!this.loginForm.valid) {
      return;
    }

    const formValue = this.loginForm.value as LoginRequest;
    this.authService.login(formValue).pipe(
      tap(
        () => {
          console.log('login successful');
        }
      )
    ).subscribe();
  }
}
