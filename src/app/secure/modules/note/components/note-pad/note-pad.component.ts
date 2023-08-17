import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Note} from "../../../../../models/note";

@Component({
  selector: 'app-note-pad',
  templateUrl: './note-pad.component.html',
  styleUrls: ['./note-pad.component.scss']
})
export class NotePadComponent implements OnInit {
  @Input() public note!: Note;

  @Output() public editNote: EventEmitter<Note>;
  @Output() public deleteNote: EventEmitter<Note>;

  constructor() {
    this.deleteNote = new EventEmitter<Note>();
    this.editNote = new EventEmitter<Note>();
  }

  ngOnInit(): void {
  }

  public onEdit(): void {
    this.editNote.emit(this.note);
  }

  public onDelete(): void {
    this.deleteNote.emit(this.note);
  }
}
