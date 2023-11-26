import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentRequest } from 'src/app/data/interfaces/student/student-request';
import { StudentService } from '../../service/student.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss']
})
export class StudentCreateComponent {

  constructor(
    private router: Router,
    private studentService: StudentService,
  ) { }

  studantForm = new FormGroup(
    {
      name: new FormControl(null, [Validators.required]),
      birth_date: new FormControl(null, [Validators.required]),
      weight: new FormControl(null, [Validators.required]),
      height: new FormControl(null, [Validators.required]),
      training_goals: new FormControl(null, [Validators.required]),
      training_frequency: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(7)]),
      health_restrictions: new FormControl(null),
    }
  )

  save() {
    if (!this.studantForm.valid) {
      return;
    }

    const formValue = this.studantForm.value as StudentRequest;
    this.studentService.create(formValue).pipe(
      tap(
        () => {
          this.router.navigate(['/protected/student']);
        }
      )
    ).subscribe();
  }
}
