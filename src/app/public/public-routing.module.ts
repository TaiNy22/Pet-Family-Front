import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {PublicComponent} from "./public.component";

const routes: Routes = [
  {path: '', component: PublicComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {
}
