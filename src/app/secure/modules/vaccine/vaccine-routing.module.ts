import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VaccineComponent} from "./vaccine.component";
import {VaccineListComponent} from "./components/vaccine-list/vaccine-list.component";
import {VaccineAllListComponent} from "./components/vaccine-all-list/vaccine-all-list.component";

const routes: Routes = [
  {
    path: '', component: VaccineComponent,
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: 'list/:id', component: VaccineListComponent},
      {path: 'all-vaccines', component: VaccineAllListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VaccineRoutingModule {
}
