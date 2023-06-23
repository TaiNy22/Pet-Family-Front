import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VaccineRoutingModule} from './vaccine-routing.module';
import {VaccineComponent} from './vaccine.component';
import {VaccineListComponent} from './components/vaccine-list/vaccine-list.component';
import {ShareModule} from "../../../share/share.module";
import {VaccineAddComponent} from './components/vaccine-add/vaccine-add.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    VaccineComponent,
    VaccineListComponent,
    VaccineAddComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    VaccineRoutingModule,
    FormsModule
  ]
})
export class VaccineModule {
}
