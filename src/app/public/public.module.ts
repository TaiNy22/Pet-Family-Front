import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PublicComponent} from './public.component';
import {PublicRoutingModule} from "./public-routing.module";
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {ShareModule} from "../share/share.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    PublicComponent,
    SignInComponent,
    SignUpComponent
  ],
  exports: [
    PublicComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ShareModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PublicModule {
}
