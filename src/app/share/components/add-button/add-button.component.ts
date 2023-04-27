import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent {

  @Input() public title: string;
  @Input() public icon: string;

  @Output() public pressButton: EventEmitter<void>;

  public showTitle: boolean;

  constructor() {
    this.pressButton = new EventEmitter<void>();
    this.icon = 'icon-plus';
    this.title = 'Agregar';
    this.showTitle = false;
  }

  public activeShowTitle(): void {
    this.showTitle = true;
  }

  public hideShowTitle(): void {
    this.showTitle = false;
  }

  public pressedButton(): void {
    this.pressButton.emit();
  }
}
