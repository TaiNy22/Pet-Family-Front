import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserHttpService} from "./services/user-http.service";
import {AuthenticationService} from "./services/auth-http.service";
import {AuthInterceptor} from "./helpers/error.interceptor";
import {ErrorInterceptor} from "./helpers/jwt.interceptor";
import {ShareModule} from "./share/share.module";
import {PetHttpService} from "./services/pet-http.service";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {VaccineHttpService} from "./services/vaccine-http.service";
import {registerLocaleData} from "@angular/common";
import es from '@angular/common/locales/es-BO';
import {TreatmentHttpService} from "./services/treatment-http.service";

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule,
    FontAwesomeModule
  ],
  providers: [
    AuthenticationService,
    PetHttpService,
    TreatmentHttpService,
    UserHttpService,
    VaccineHttpService,
    {provide: LOCALE_ID, useValue: 'es-BO'},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
