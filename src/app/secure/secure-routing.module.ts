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
      {
        path: 'notes', loadChildren: () => import('./modules/note/note.module').then(m => m.NoteModule)
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
