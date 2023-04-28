import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SecureComponent} from "./secure.component";

const routes: Routes = [
  {
    path: '', component: SecureComponent,
    children: [
      {path: '', redirectTo: 'pet', pathMatch: 'full'},
      {
        path: 'pet', loadChildren: () => import('./modules/pet/pet.module').then(m => m.PetModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule {
}
