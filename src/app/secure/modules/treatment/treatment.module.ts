import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TreatmentRoutingModule} from './treatment-routing.module';
import {TreatmentComponent} from './treatment.component';
import {TreatmentListComponent} from './components/treatment-list/treatment-list.component';
import {ShareModule} from "../../../share/share.module";
import {FormsModule} from "@angular/forms";
import {TreatmentAddComponent} from './components/treatment-add/treatment-add.component';
import {TreatmentAllListComponent} from './components/treatment-all-list/treatment-all-list.component';
import { TreatmentReportComponent } from './components/treatment-report/treatment-report.component';

@NgModule({
  declarations: [
    TreatmentComponent,
    TreatmentListComponent,
    TreatmentAddComponent,
    TreatmentAllListComponent,
    TreatmentReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ShareModule,
    TreatmentRoutingModule
  ]
})
export class TreatmentModule {
}
