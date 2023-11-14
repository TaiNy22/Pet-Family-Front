import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TipComponent} from "./tip.component";

const routes: Routes = [
  {
    path: '', component: TipComponent,
    children: [
      {path: '', redirectTo: '', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipRoutingModule {
}
