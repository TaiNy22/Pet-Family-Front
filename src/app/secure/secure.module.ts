import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SecureComponent} from './secure.component';
import {SecureRoutingModule} from "./secure-routing.module";
import { CardPetComponent } from './components/card-pet/card-pet.component';
import { PetsListComponent } from './components/pets-list/pets-list.component';
import {ShareModule} from "../share/share.module";
import { AddPetComponent } from './components/add-pet/add-pet.component';


@NgModule({
  declarations: [
    SecureComponent,
    CardPetComponent,
    PetsListComponent,
    AddPetComponent
  ],
    imports: [
        CommonModule,
        SecureRoutingModule,
        ShareModule
    ]
})
export class SecureModule {
}
