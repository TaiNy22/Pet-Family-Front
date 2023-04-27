import {Component, OnInit} from '@angular/core';
import {AvatarFormEnum} from "../../../models/avatar-form.enum";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/auth-http.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {first} from "rxjs";
import {UserToken} from "../../../models/user-token";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public avatarForm: typeof AvatarFormEnum = AvatarFormEnum;
  public error: string = '';
  public isLoggedIn: boolean;
  public isLoginFailed: boolean;
  public loading: boolean;
  public loginForm!: FormGroup;
  public submitted: boolean;

  constructor(private authenticationService: AuthenticationService,
              private tokenStorageService: TokenStorageService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.isLoginFailed = false;
    this.isLoggedIn = false;
    this.submitted = false;
    this.loading = false;
  }

  ngOnInit(): void {
    this._initialize();
  }

  private _initialize(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
    }

    this._newForm();
  }

  private _newForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  public submit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authenticationService.login(this.form['username'].value, this.form['password'].value)
      .pipe(first())
      .subscribe({
        next: (data: UserToken) => {
          this.tokenStorageService.saveToken(data.token);
          this.tokenStorageService.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.loading = false;

          this.router.navigate(['/secure']);
        },
        error: (error) => {
          this.error = error.error.message;
          this.loading = false;
          this.isLoginFailed = true;
        }
      });
  }
}
