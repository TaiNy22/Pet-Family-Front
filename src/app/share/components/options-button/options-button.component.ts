import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-options-button',
  templateUrl: './options-button.component.html',
  styleUrls: ['./options-button.component.scss']
})
export class OptionsButtonComponent implements OnInit {

  @Output() public edit: EventEmitter<void>;
  @Output() public delete: EventEmitter<void>;

  public showOptions: boolean;

  constructor() {
    this.delete = new EventEmitter<void>();
    this.edit = new EventEmitter<void>();
    this.showOptions = false;
  }

  ngOnInit(): void {
  }

  public toggleShowOptions(): void {
    this.showOptions = true;
  }

  public hideOptions(): void {
    this.showOptions = false;
  }

  public editAction(): void {
    this.edit.emit();
    this.hideOptions();
  }

  public deleteAction(): void {
    this.delete.emit();
    this.hideOptions();
  }
}
