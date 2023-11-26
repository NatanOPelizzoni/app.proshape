import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentViewComponent } from './components/student-view/student-view.component';
import { StudentCreateComponent } from './components/student-create/student-create.component';
import { StudentUpdateComponent } from './components/student-update/student-update.component';

@NgModule({
  declarations: [

    StudentListComponent,
    StudentViewComponent,
    StudentCreateComponent,
    StudentUpdateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class StudentModule { }
