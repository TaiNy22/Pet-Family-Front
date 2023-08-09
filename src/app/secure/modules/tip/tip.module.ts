import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TipComponent} from './tip.component';
import { PetTipsListComponent } from './components/pet-tips-list/pet-tips-list.component';
import { TipDetailComponent } from './components/tip-detail/tip-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TipComponent,
    PetTipsListComponent,
    TipDetailComponent
  ],
  exports: [
    TipComponent
  ]
})
export class TipModule {
}
