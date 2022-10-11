import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecureRoutingModule } from './secure-routing.module';
import { UsersFormComponent } from './components/users-form.component';
import { SecureComponent } from './secure.component';


@NgModule({
  declarations: [
    UsersFormComponent,
    SecureComponent
  ],
  imports: [
    CommonModule,
    SecureRoutingModule
  ], 
  exports: []
})
export class SecureModule { }
