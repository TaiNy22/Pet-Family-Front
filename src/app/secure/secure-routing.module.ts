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
      {
        path: 'tasks', loadChildren: () => import('./modules/task/task.module').then(m => m.TaskModule)
      },
      {
        path: 'tips', loadChildren: () => import('./modules/tip/tip.module').then(m => m.TipModule)
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
