import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PetRoutingModule} from './pet-routing.module';
import {PetComponent} from './pet.component';
import {PetListComponent} from './components/pet-list/pet-list.component';
import {PetCardComponent} from './components/pet-card/pet-card.component';
import {PetAddComponent} from './components/pet-add/pet-add.component';
import {ShareModule} from "../../../share/share.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PetEditFormComponent} from './components/pet-edit-form/pet-edit-form.component';
import {PetViewComponent} from './components/pet-view/pet-view.component';
import {RouterModule} from "@angular/router";
import { PetInfoComponent } from './components/pet-info/pet-info.component';

@NgModule({
  declarations: [
    PetComponent,
    PetListComponent,
    PetCardComponent,
    PetAddComponent,
    PetEditFormComponent,
    PetViewComponent,
    PetInfoComponent
  ],
  imports: [
    CommonModule,
    PetRoutingModule,
    ShareModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule
  ]
})
export class PetModule {
}
