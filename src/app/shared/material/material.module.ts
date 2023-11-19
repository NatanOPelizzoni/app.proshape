import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatTabsModule,
    MatSidenavModule
  ],
  exports: [
    MatSnackBarModule,
    MatTabsModule,
    MatSidenavModule
  ]
})
export class MaterialModule { }
