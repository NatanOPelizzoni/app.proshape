import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import { environment } from 'src/app/data/constants/environment';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from './shared/material/material.module';

export function tokenGetter() {
  const token = localStorage.getItem(environment.LOCALSTORAGE_TOKEN_KEY);
  const tokenType = localStorage.getItem(environment.LOCALSTORAGE_TOKEN_TYPE);
  return `${tokenType} ${token}`;
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MaterialModule,

    AppRoutingModule,
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
