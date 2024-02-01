import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TipComponent} from './tip.component';
import {PetTipsListComponent} from './components/pet-tips-list/pet-tips-list.component';
import {TipDetailComponent} from './components/tip-detail/tip-detail.component';
import {TipRoutingModule} from "./tip-routing.module";
import {FormsModule} from "@angular/forms";
import {NgxMasonryModule} from "ngx-masonry";
import {ShareModule} from "../../../share/share.module";
import {TipAddComponent} from './components/tip-add/tip-add.component';

@NgModule({
  declarations: [
    TipComponent,
    PetTipsListComponent,
    TipDetailComponent,
    TipAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TipRoutingModule,
    NgxMasonryModule,
    ShareModule
  ],
  exports: [
    TipComponent,
    TipDetailComponent
  ]
})
export class TipModule {
}
