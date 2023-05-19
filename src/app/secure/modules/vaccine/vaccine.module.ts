import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VaccineRoutingModule } from './vaccine-routing.module';
import { VaccineComponent } from './vaccine.component';


@NgModule({
  declarations: [
    VaccineComponent
  ],
  imports: [
    CommonModule,
    VaccineRoutingModule
  ]
})
export class VaccineModule { }
