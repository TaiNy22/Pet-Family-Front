import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TokenStorageService} from "../../../services/token-storage.service";
import {RoleUser, User} from "../../../models/user";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() public openMenu: EventEmitter<void>;

  public admin: RoleUser;
  public currentUser: User | null;
  public isLoggedIn: boolean;

  constructor(private tokenStorageService: TokenStorageService) {
    this.openMenu = new EventEmitter<void>();
    this.admin = RoleUser.ADMIN;
    this.isLoggedIn = false;
    this.currentUser = null;
  }

  ngOnInit(): void {
    this.listenCurrentUser();
  }

  public logout(): void {
    this.isLoggedIn = false;
    this.tokenStorageService.signOut();
  }

  public openSideBar(): void {
    this.openMenu.emit();
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
