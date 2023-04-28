import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PetRoutingModule} from './pet-routing.module';
import {PetComponent} from './pet.component';
import {PetListComponent} from './components/pet-list/pet-list.component';
import {PetCardComponent} from './components/pet-card/pet-card.component';
import {PetAddComponent} from './components/pet-add/pet-add.component';
import {ShareModule} from "../../../share/share.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    PetComponent,
    PetListComponent,
    PetCardComponent,
    PetAddComponent
  ],
  imports: [
    CommonModule,
    PetRoutingModule,
    ShareModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PetModule {
}
