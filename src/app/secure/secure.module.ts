import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SecureComponent} from './secure.component';
import {SecureRoutingModule} from "./secure-routing.module";
import {ShareModule} from "../share/share.module";


@NgModule({
  declarations: [
    SecureComponent
  ],
  imports: [
    CommonModule,
    SecureRoutingModule,
    ShareModule
  ]
})
export class SecureModule {
}
