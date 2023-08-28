import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NoteComponent} from './note.component';
import {NoteRoutingModule} from "./note-routing.module";
import {NoteListComponent} from './components/note-list/note-list.component';
import {NotePadComponent} from './components/note-pad/note-pad.component';
import {ShareModule} from "../../../share/share.module";
import {NgxMasonryModule} from "ngx-masonry";
import {NoteAddComponent} from './components/note-add/note-add.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    NoteComponent,
    NoteListComponent,
    NotePadComponent,
    NoteAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NoteRoutingModule,
    ShareModule,
    NgxMasonryModule
  ]
})
export class NoteModule {
}
