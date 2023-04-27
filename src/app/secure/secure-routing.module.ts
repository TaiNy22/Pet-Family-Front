import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SecureComponent} from "./secure.component";
import {PetsListComponent} from "./components/pets-list/pets-list.component";

const routes: Routes = [
  {
    path: '', component: SecureComponent,
    children: [
      {path: '', redirectTo: 'pet-list', pathMatch: 'full'},
      {path: 'pet-list', component: PetsListComponent},
      {path: 'add-pet', component: SecureComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule {
}
