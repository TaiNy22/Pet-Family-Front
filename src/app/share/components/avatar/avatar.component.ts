import {Component, Input, OnInit} from '@angular/core';
import {AvatarFormEnum} from "../../../models/avatar-form.enum";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input() public user: any;
  @Input() public form: AvatarFormEnum;
  @Input() public width: string;
  @Input() public height: string;

  public avatarForm: typeof AvatarFormEnum = AvatarFormEnum;

  constructor() {
    this.form = AvatarFormEnum.ROUNDED;
    this.height = '16px'
    this.width = '16px';
  }

  ngOnInit(): void {
  }
}
