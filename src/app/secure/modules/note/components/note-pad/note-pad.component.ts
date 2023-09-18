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

  public optionsHover: boolean;

  constructor() {
    this.deleteNote = new EventEmitter<Note>();
    this.editNote = new EventEmitter<Note>();
    this.optionsHover = false;
  }

  public onEdit(): void {
    this.optionsHover = false;
    this.editNote.emit(this.note);
  }

  public onEdit2(): void {
    if (this.optionsHover) {
      return;
    }

    this.editNote.emit(this.note);
  }

  public onDelete(): void {
    this.deleteNote.emit(this.note);
  }
}
