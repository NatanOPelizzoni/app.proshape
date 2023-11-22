import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProtectedRoutingModule } from './protected-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { StudentComponent } from './components/student/student.component';
import { StudentsTableComponent } from './components/student/components/students-table/students-table.component';
import { StudentFormComponent } from './components/student/components/student-form/student-form.component';


@NgModule({
  declarations: [
    DashboardComponent,
    StudentComponent,
    StudentsTableComponent,
    StudentFormComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    MaterialModule
  ]
})
export class ProtectedModule { }
