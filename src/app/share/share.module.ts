import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AvatarComponent} from './components/avatar/avatar.component';
import {AddButtonComponent} from './components/add-button/add-button.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {RouterModule} from "@angular/router";
import {OptionsButtonComponent} from './components/options-button/options-button.component';
import {SideBarComponent} from './components/side-bar/side-bar.component';

@NgModule({
  declarations: [
    AvatarComponent,
    AddButtonComponent,
    NavbarComponent,
    OptionsButtonComponent,
    SideBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AvatarComponent,
    AddButtonComponent,
    NavbarComponent,
    OptionsButtonComponent,
    SideBarComponent
  ]
})
export class ShareModule {
}
