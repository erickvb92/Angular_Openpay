import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';

import { LoginComponent } from './components/login/login.component';
import { BienvenidoComponent } from "./components/bienvenido/bienvenido.component";
import { DialogoConfirmacionComponent } from "./components/dialogo/dialogo-confirmacion.component";
import { bitacoraComponent } from "./components/bitacora/bitacora.component";

import { MatTableModule } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import {MatIconModule} from '@angular/material/icon';

import {MaterialExampleModule} from '../MaterialExampleModule';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { DatePipe } from '@angular/common';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BienvenidoComponent,
    DialogoConfirmacionComponent,
    bitacoraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,
    MaterialExampleModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatExpansionModule,
    RecaptchaModule,
RecaptchaFormsModule,
  ],
  providers:  [
    //{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    DatePipe
],
  bootstrap: [AppComponent]
})
export class AppModule { }
