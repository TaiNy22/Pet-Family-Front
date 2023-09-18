import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../../../models/user";
import {ItemTask, Task} from "../../../../../models/task";

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent implements OnInit {

  @Input() public user!: User;
  @Input() public taskEdit!: Task | undefined;
  @Input() public editModeActive: boolean;

  @Output() public cancelAdd: EventEmitter<void>;
  @Output() public emitTask: EventEmitter<any>;

  public title: string;
  public items: ItemTask[];

  constructor() {
    this.cancelAdd = new EventEmitter<void>();
    this.emitTask = new EventEmitter<any>();
    this.editModeActive = false;
    this.items = [{description: '', done: false}];
    this.title = '';
  }

  public ngOnInit(): void {
    if (this.taskEdit && this.editModeActive) {
      this.items = this.taskEdit.items;
      this.title = this.taskEdit.title;
    }
  }

  public saveTask(): void {
    if (!this.items.length) {
      return;
    }

    this.emitTask.emit({
      userId: this.user.id,
      title: this.title,
      items: this.items
    });
  }

  public cancel(): void {
    this.title = '';
    this.items = [];

    this.cancelAdd.emit();
  }

  public addItem(): void {
    this.items.push({done: false, description: ''});
  }

  public removeItem(index: number): void {
    this.items.splice(index, 1);
  }

  public doneTask(done: boolean, index: number): void {
    this.items[index].done = done;
  }
}
