import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TreatmentComponent} from "./treatment.component";
import {TreatmentListComponent} from "./components/treatment-list/treatment-list.component";

const routes: Routes = [
  {
    path: '', component: TreatmentComponent,
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: 'list/:id', component: TreatmentListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreatmentRoutingModule {
}
