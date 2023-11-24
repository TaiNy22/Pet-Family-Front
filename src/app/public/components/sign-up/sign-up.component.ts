import {Component, OnInit} from '@angular/core';
import {AvatarFormEnum} from "../../../models/avatar-form.enum";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/auth-http.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {RoleUser, User} from "../../../models/user";
import {first} from "rxjs";
import {UserToken} from "../../../models/user-token";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public avatarForm: typeof AvatarFormEnum = AvatarFormEnum;
  public error: string = '';
  public isLoggedIn: boolean;
  public isLoginFailed: boolean;
  public loading: boolean;
  public registerForm!: FormGroup;
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
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      lastname: ['', Validators.required],
      name: ['', Validators.required],
      password: ['',[ Validators.required, Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}')]],
      phone: [''],
      username: ['', Validators.required]
    });
  }

  get form() {
    return this.registerForm.controls;
  }

  public submit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    const userRegister: User = {
      email: this.form['email'].value,
      lastname: this.form['lastname'].value,
      name: this.form['name'].value,
      password: this.form['password'].value,
      phone: this.form['phone'].value,
      roles: [RoleUser.USER],
      username: this.form['username'].value,
    }

    this.authenticationService.register(userRegister)
      .pipe(first())
      .subscribe({
        next: (user: any) => {
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.loading = false;

          this._loginPostRegister(user);
        },
        error: (error) => {
          this.error = error.error.message;
          this.loading = false;
          this.isLoginFailed = true;
        }
      })
  }

  private _loginPostRegister(user: {username: string, password: string}): void {
    this.authenticationService.login(user.username, user.password)
      .pipe(first())
      .subscribe({
        next: (data: UserToken) => {
          this.tokenStorageService.saveToken(data.token);
          this.tokenStorageService.saveUser(data);

          this.router.navigate(['/secure']);
        },
        error: (error) => {
          this.error = error.error.message;
        }
      });
  }
}
