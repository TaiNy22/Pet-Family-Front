import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../services/token-storage.service";
import {RoleUser, User} from "../../../models/user";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isLoggedIn: boolean;
  public currentUser: User | null;
  public admin: RoleUser;

  constructor(private tokenStorageService: TokenStorageService) {
    this.isLoggedIn = false;
    this.currentUser = null;
    this.admin = RoleUser.ADMIN;
  }

  ngOnInit(): void {
    this.listenCurrentUser();
  }

  public logout(): void {
    this.isLoggedIn = false;
    this.tokenStorageService.signOut();
  }

  private listenCurrentUser(): void {
    this.tokenStorageService.listenCurrentUser()
      .subscribe((data: any) => {
        if (data !== null) {
          this.currentUser = this.tokenStorageService.getUser();

          this.isLoggedIn = true;
        }
      });
  }
}
