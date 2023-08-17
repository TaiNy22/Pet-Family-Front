import {Component, OnInit} from '@angular/core';
import {Note} from "../../../../../models/note";
import {NoteHttpService} from "../../../../../services/note-http.service";
import {take} from "rxjs";
import {TokenStorageService} from "../../../../../services/token-storage.service";
import {User} from "../../../../../models/user";
import {not} from "rxjs/internal/util/not";

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

  public editModeActive: boolean;
  public listNotes: Note[];
  public noteToEdit!: Note | undefined;
  public showAddNote: boolean;
  public userLogged!: User;

  constructor(private tokenService: TokenStorageService,
              private noteHttpService: NoteHttpService) {
    this.editModeActive = false;
    this.showAddNote = false;
    this.listNotes = [];
  }

  public ngOnInit(): void {
    this._getLoggedUser();
    this._getNotes();
  }

  public saveNewNote(note: any): void {
    if (this.editModeActive) {
      this.saveEditNote(note);
    } else {
      this.noteHttpService.create(note).pipe(take(1))
        .subscribe({
          next: (note: Note) => {
            this.listNotes.push(note);
            this.showAddNote = false;
          },
          error: err => console.log(err)
        });
    }
  }

  public addNote(): void {
    this.showAddNote = true;
  }

  public cancelAddNote(): void {
    this.showAddNote = false;
    this.editModeActive = false;
  }

  public editNote(note: Note): void {
    this.noteToEdit = note;
    this.editModeActive = true;
    this.showAddNote = true;
  }

  public deleteNote(note: Note): void {
    this.noteHttpService.delete(note.id).pipe(take(1)).subscribe();

    this.listNotes.splice(this.listNotes.indexOf(note), 1);
  }

  private _getNotes(): void {
    this.noteHttpService.getByUserId((this.userLogged?.id as number).toString())
      .pipe(take(1))
      .subscribe({
        next: (notes: Note[]) => this.listNotes = notes,
        error: err => console.log(err)
      });
  }

  private saveEditNote(note: any): void {
    if (!this.noteToEdit) {
      return;
    }

    this.noteHttpService.edit(this.noteToEdit.id, note).pipe(take(1))
      .subscribe({
        next: (note: Note) => {
          if (!this.noteToEdit) {
            return;
          }

          this.listNotes[this.listNotes.indexOf(this.noteToEdit)] = note;
          this.showAddNote = false;
          this.editModeActive = false;
          this.noteToEdit = undefined;
        },
        error: err => console.log(err)
      });
  }

  private _getLoggedUser(): void {
    this.userLogged = this.tokenService.getUser() as User;
  }
}
