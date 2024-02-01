import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Tip} from "../../../../../models/tip";
import {RoleUser, User} from "../../../../../models/user";

@Component({
  selector: 'app-tip-detail',
  templateUrl: './tip-detail.component.html',
  styleUrls: ['./tip-detail.component.scss']
})
export class TipDetailComponent {

  @Input() public tip!: Tip;
  @Input() public userLogged!: User;

  @Output() public editTip: EventEmitter<Tip>;
  @Output() public deleteTip: EventEmitter<Tip>;

  public optionsHover: boolean;

  public readonly role: typeof RoleUser = RoleUser;

  constructor() {
    this.deleteTip = new EventEmitter<Tip>();
    this.editTip = new EventEmitter<Tip>();
    this.optionsHover = false;
  }

  public onEdit(): void {
    this.optionsHover = false;
    this.editTip.emit(this.tip);
  }

  public onDelete(): void {
    this.deleteTip.emit(this.tip);
  }
}
