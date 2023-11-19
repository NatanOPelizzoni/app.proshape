import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import { environment } from 'src/app/data/constants/environment';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

export function tokenGetter() {
  const token = localStorage.getItem(environment.LOCALSTORAGE_TOKEN_KEY);
  const tokenType = localStorage.getItem(environment.LOCALSTORAGE_TOKEN_TYPE);
  return `${tokenType} ${token}`;
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    AppRoutingModule,

    MatSnackBarModule,

    CoreModule,
    SharedModule,
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
