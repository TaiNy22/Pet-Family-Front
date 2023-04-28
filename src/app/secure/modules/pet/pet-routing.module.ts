import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PetListComponent} from "./components/pet-list/pet-list.component";
import {PetAddComponent} from "./components/pet-add/pet-add.component";
import {PetComponent} from "./pet.component";

const routes: Routes = [
  {
    path: '', component: PetComponent,
    children: [
      {path: '', redirectTo: 'pet-list', pathMatch: 'full'},
      {path: 'pet-list', component: PetListComponent},
      {path: 'pet-form', component: PetAddComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetRoutingModule {
}
