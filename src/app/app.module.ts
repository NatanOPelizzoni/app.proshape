import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';

import { SharedModule } from './shared/shared.module';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export const LOCALSTORAGE_TOKEN_KEY = 'proshape-token';
export const LOCALSTORAGE_TOKEN_TYPE = 'proshape-token-type';

export function tokenGetter() {
  const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
  const tokenType = localStorage.getItem(LOCALSTORAGE_TOKEN_TYPE);
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
