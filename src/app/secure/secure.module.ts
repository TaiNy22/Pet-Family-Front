import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SecureComponent} from './secure.component';
import {SecureRoutingModule} from "./secure-routing.module";
import {ShareModule} from "../share/share.module";
import {TipModule} from "./modules/tip/tip.module";


@NgModule({
  declarations: [
    SecureComponent
  ],
  imports: [
    CommonModule,
    SecureRoutingModule,
    ShareModule,
    TipModule
  ]
})
export class SecureModule {
}
