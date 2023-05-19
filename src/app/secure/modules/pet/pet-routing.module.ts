import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PetListComponent} from "./components/pet-list/pet-list.component";
import {PetAddComponent} from "./components/pet-add/pet-add.component";
import {PetComponent} from "./pet.component";
import {PetEditFormComponent} from "./components/pet-edit-form/pet-edit-form.component";
import {PetViewComponent} from "./components/pet-view/pet-view.component";

const routes: Routes = [
  {
    path: '', component: PetComponent,
    children: [
      {path: '', redirectTo: 'pet-list', pathMatch: 'full'},
      {path: 'pet-info/:id', component: PetViewComponent},
      {path: 'pet-list', component: PetListComponent},
      {path: 'pet-add', component: PetAddComponent},
      {path: 'pet-edit/:id', component: PetEditFormComponent}
    ]
  },
  {
    path: 'vaccine', loadChildren: () => import('../vaccine/vaccine.module').then(m => m.VaccineModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetRoutingModule {
}
