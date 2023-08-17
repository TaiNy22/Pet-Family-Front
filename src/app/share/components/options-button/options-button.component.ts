import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-options-button',
  templateUrl: './options-button.component.html',
  styleUrls: ['./options-button.component.scss']
})
export class OptionsButtonComponent {
  @Input() public boxShadow: boolean;
  @Input() public background: boolean;

  @Output() public edit: EventEmitter<void>;
  @Output() public delete: EventEmitter<void>;

  public showOptions: boolean;

  constructor() {
    this.delete = new EventEmitter<void>();
    this.edit = new EventEmitter<void>();
    this.showOptions = false;
    this.background = false;
    this.boxShadow = false;
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
