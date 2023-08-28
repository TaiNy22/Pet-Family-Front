import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Note} from "../../../../../models/note";

@Component({
  selector: 'app-note-pad',
  templateUrl: './note-pad.component.html',
  styleUrls: ['./note-pad.component.scss']
})
export class NotePadComponent {
  @Input() public note!: Note;

  @Output() public editNote: EventEmitter<Note>;
  @Output() public deleteNote: EventEmitter<Note>;

  constructor() {
    this.deleteNote = new EventEmitter<Note>();
    this.editNote = new EventEmitter<Note>();
  }

  public onEdit(): void {
    this.editNote.emit(this.note);
  }

  public onDelete(): void {
    this.deleteNote.emit(this.note);
  }
}
