import {Component, OnInit} from '@angular/core';
import {User} from "../../../../../models/user";
import {TokenStorageService} from "../../../../../services/token-storage.service";
import {TaskHttpService} from "../../../../../services/task-http.service";
import {take} from "rxjs";
import {Task} from "../../../../../models/task";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  public editModeActive: boolean;
  public taskList: Task[];
  public taskToEdit!: Task | undefined;
  public showAddTask: boolean;
  public userLogged!: User;

  constructor(private tokenService: TokenStorageService,
              private taskHttpService: TaskHttpService) {
    this.editModeActive = false;
    this.showAddTask = false;
    this.taskList = [];
  }

  public ngOnInit(): void {
    this._getLoggedUser();
    this._getTasks();
  }

  public saveNewTask(task: any): void {
    if (this.editModeActive) {
      this._saveEditTask(task);
    } else {
      this.taskHttpService.create(task).pipe(take(1))
        .subscribe({
          next: (task: Task) => {
            this._getTasks();

            this.showAddTask = false;
          },
          error: err => console.log(err)
        });
    }
  }

  public addTask(): void {
    this.showAddTask = true;
  }

  public cancelAddTask(): void {
    this.showAddTask = false;
    this.editModeActive = false;
  }

  public editTask(task: Task): void {
    this.taskToEdit = task;
    this.editModeActive = true;
    this.showAddTask = true;
  }

  public deleteTask(task: Task): void {
    this.taskHttpService.delete(task.id).pipe(take(1)).subscribe();

    this.taskList.splice(this.taskList.indexOf(task), 1);
  }

  private _getTasks(): void {
    this.taskHttpService.getByUserId((this.userLogged?.id as number).toString())
      .pipe(take(1))
      .subscribe({
        next: (tasks: Task[]) => {
          this.taskList = tasks;
          this._sortByDate();
        },
        error: err => console.log(err)
      });
  }

  private _saveEditTask(task: any): void {
    if (!this.taskToEdit) {
      return;
    }

    this.taskHttpService.edit(this.taskToEdit.id, task).pipe(take(1))
      .subscribe({
        next: (task: Task) => {
          if (!this.taskToEdit) {
            return;
          }

          this._getTasks();
          this.showAddTask = false;
          this.editModeActive = false;
          this.taskToEdit = undefined;
        },
        error: err => console.log(err)
      });
  }

  private _getLoggedUser(): void {
    this.userLogged = this.tokenService.getUser() as User;
  }

  private _sortByDate(): void {
    this.taskList.sort((a: Task, b: Task) => {
      const dateA: Date = a.createdDate;
      const dateB: Date = b.createdDate;

      if (dateA > dateB) {
        return -1;
      }
      if (dateA < dateB) {
        return 1;
      }

      return 0;
    });
  }
}
