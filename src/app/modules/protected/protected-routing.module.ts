import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentListComponent } from './components/student/components/student-list/student-list.component';
import { StudentViewComponent } from './components/student/components/student-view/student-view.component';
import { StudentCreateComponent } from './components/student/components/student-create/student-create.component';
import { StudentUpdateComponent } from './components/student/components/student-update/student-update.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'student',
    redirectTo: 'student/list',
    pathMatch: 'full'
  },
  {
    path: 'student/list',
    component: StudentListComponent
  },
  {
    path: 'student/view/:id',
    component: StudentViewComponent
  },
  {
    path: 'student/create',
    component: StudentCreateComponent
  },
  {
    path: 'student/update/:id',
    component: StudentUpdateComponent
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
