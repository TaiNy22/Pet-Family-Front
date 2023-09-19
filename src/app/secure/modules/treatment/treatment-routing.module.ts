import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TreatmentComponent} from "./treatment.component";
import {TreatmentListComponent} from "./components/treatment-list/treatment-list.component";
import {TreatmentAllListComponent} from "./components/treatment-all-list/treatment-all-list.component";

const routes: Routes = [
  {
    path: '', component: TreatmentComponent,
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: 'list/:id', component: TreatmentListComponent},
      {path: 'all-treatments', component: TreatmentAllListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreatmentRoutingModule {
}
