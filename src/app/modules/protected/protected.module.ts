import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProtectedRoutingModule } from './protected-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { StudentModule } from './components/student/student.module';


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    MaterialModule,
    StudentModule,
  ]
})
export class ProtectedModule { }
