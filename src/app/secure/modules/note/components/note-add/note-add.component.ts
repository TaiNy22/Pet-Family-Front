import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Note} from "../../../../../models/note";
import {User} from "../../../../../models/user";

@Component({
  selector: 'app-note-add',
  templateUrl: './note-add.component.html',
  styleUrls: ['./note-add.component.scss']
})
export class NoteAddComponent implements OnInit {

  @Input() public user!: User;
  @Input() public noteEdit!: Note | undefined;
  @Input() public editModeActive: boolean;

  @Output() public cancelAdd: EventEmitter<void>;
  @Output() public emitNote: EventEmitter<any>;

  public title: string;
  public description: string;

  constructor() {
    this.cancelAdd = new EventEmitter<void>();
    this.emitNote = new EventEmitter<any>();
    this.editModeActive = false;
    this.description = '';
    this.title = '';
  }

  public ngOnInit(): void {
    if (this.noteEdit && this.editModeActive) {
      this.description = this.noteEdit.description;
      this.title = this.noteEdit.title;
    }
  }

  public saveNote(): void {
    if (!this.description.length) {
      return;
    }

    this.emitNote.emit({
      userId: this.user.id,
      title: this.title,
      description: this.description
    });
  }

  public cancel(): void {
    this.title = '';
    this.description = '';

    this.cancelAdd.emit();
  }
}
