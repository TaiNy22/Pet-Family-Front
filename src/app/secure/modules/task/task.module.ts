import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TaskRoutingModule} from './task-routing.module';
import {TaskComponent} from './task.component';
import {TaskAddComponent} from './components/task-add/task-add.component';
import {TaskListComponent} from './components/task-list/task-list.component';
import {TaskPadComponent} from './components/task-pad/task-pad.component';
import {ShareModule} from "../../../share/share.module";
import {NgxMasonryModule} from "ngx-masonry";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    TaskComponent,
    TaskAddComponent,
    TaskListComponent,
    TaskPadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxMasonryModule,
    TaskRoutingModule,
    ShareModule
  ]
})
export class TaskModule {
}
