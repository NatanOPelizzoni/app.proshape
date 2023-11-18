import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { RegisterRequest } from 'src/app/data/interfaces/register/register-request';
import { RegisterValidators } from 'src/app/shared/validators/register-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  hidePassword = true;
  hidePasswordConfirmation = true;

  registerForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [Validators.required]),
    },
    {
      validators: RegisterValidators.passwordsMatching
    }
  )

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  register() {
    if (!this.registerForm.valid) {
      return;
    }

    const formValue = this.registerForm.value as RegisterRequest;
    this.authService.register(formValue).pipe(
      tap(
        () => {
          console.log('User created successfully');

          // this.router.navigate(['../login']);
        }
      )
    ).subscribe();
  }
}
