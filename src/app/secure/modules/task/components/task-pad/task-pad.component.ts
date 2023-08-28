import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from "../../../../../models/task";

@Component({
  selector: 'app-task-pad',
  templateUrl: './task-pad.component.html',
  styleUrls: ['./task-pad.component.scss']
})
export class TaskPadComponent {
  @Input() public task!: Task;

  @Output() public editTask: EventEmitter<Task>;
  @Output() public deleteTask: EventEmitter<Task>;

  constructor() {
    this.deleteTask = new EventEmitter<Task>();
    this.editTask = new EventEmitter<Task>();
  }

  public onEdit(): void {
    this.editTask.emit(this.task);
  }

  public onDelete(): void {
    this.deleteTask.emit(this.task);
  }
}
