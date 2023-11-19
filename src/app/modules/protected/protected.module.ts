import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProtectedRoutingModule } from './protected-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { StudentComponent } from './components/student/student.component';



@NgModule({
  declarations: [
    DashboardComponent,
    StudentComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    MaterialModule,
  ]
})
export class ProtectedModule { }
