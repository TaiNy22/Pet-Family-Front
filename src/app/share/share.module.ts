import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AvatarComponent} from './components/avatar/avatar.component';
import {AddButtonComponent} from './components/add-button/add-button.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AvatarComponent,
    AddButtonComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AvatarComponent,
    AddButtonComponent,
    NavbarComponent
  ]
})
export class ShareModule {
}
