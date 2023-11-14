import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TipComponent} from './tip.component';
import {PetTipsListComponent} from './components/pet-tips-list/pet-tips-list.component';
import {TipDetailComponent} from './components/tip-detail/tip-detail.component';
import {TipRoutingModule} from "./tip-routing.module";
import {FormsModule} from "@angular/forms";
import {NgxMasonryModule} from "ngx-masonry";

@NgModule({
  declarations: [
    TipComponent,
    PetTipsListComponent,
    TipDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TipRoutingModule,
    NgxMasonryModule
  ],
  exports: [
    TipComponent,
    TipDetailComponent
  ]
})
export class TipModule {
}
