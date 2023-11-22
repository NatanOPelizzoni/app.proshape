import { AbstractControl, ValidationErrors } from "@angular/forms";

export class RegisterValidators {
  static passwordsMatching(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const password_confirmation = control.get('password_confirmation')?.value;

    if((password === password_confirmation) && (password !== null && password_confirmation !== null)){
      return null;
    }else{
      return { passwordsNotMatching: true };
    }
  }
}
