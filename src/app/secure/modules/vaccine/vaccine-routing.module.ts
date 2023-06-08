import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VaccineComponent} from "./vaccine.component";
import {VaccineListComponent} from "./components/vaccine-list/vaccine-list.component";
import {VaccineAddComponent} from "./components/vaccine-add/vaccine-add.component";

const routes: Routes = [
  {
    path: '', component: VaccineComponent,
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: 'list/:id', component: VaccineListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VaccineRoutingModule {
}
