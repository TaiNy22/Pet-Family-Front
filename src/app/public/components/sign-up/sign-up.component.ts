import {Component, OnInit} from '@angular/core';
import {AvatarFormEnum} from "../../../models/avatar-form.enum";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public avatarForm: typeof AvatarFormEnum = AvatarFormEnum;

  constructor(private route: Router) {
  }

  ngOnInit(): void {
  }

  public submit(): void {
    this.route.navigate(['/secure']);
  }
}
