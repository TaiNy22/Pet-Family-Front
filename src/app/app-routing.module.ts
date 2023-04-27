import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./helpers/auth.guard";

const routes: Routes = [
  {
    path: 'public', loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'secure', loadChildren: () => import('./secure/secure.module').then(m => m.SecureModule), canActivate: [AuthGuard]
  },
  {
    path: '', redirectTo: '/public/sign-in', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
