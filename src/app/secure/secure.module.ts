import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SecureComponent} from './secure.component';
import {SecureRoutingModule} from "./secure-routing.module";
import { CardPetComponent } from './components/card-pet/card-pet.component';
import { PetsListComponent } from './components/pets-list/pets-list.component';


@NgModule({
  declarations: [
    SecureComponent,
    CardPetComponent,
    PetsListComponent
  ],
  imports: [
    CommonModule,
    SecureRoutingModule
  ]
})
export class SecureModule {
}
