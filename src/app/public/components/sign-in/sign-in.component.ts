import {Component, OnInit} from '@angular/core';
import {AvatarFormEnum} from "../../../models/avatar-form.enum";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public avatarForm: typeof AvatarFormEnum = AvatarFormEnum;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  public submit(): void {
    this.router.navigate(['/secure'])
      .then((nav) => {
        console.log(nav)
      }, error => {
        console.log(error)
      });
  }
}
