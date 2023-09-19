import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TokenStorageService} from "../../../services/token-storage.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Output() public close: EventEmitter<void>;

  public menuList: any[] = [];

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) {
    this.close = new EventEmitter<void>();
  }

  ngOnInit(): void {
    this._initialize();
  }

  public closeSideBar(): void {
    this.close.emit();
  }

  public logout(): void {
    this.tokenStorageService.signOut();
  }

  public itemSelected(url: string): void {
    this.router.navigate([`${url}`]).then(() => this.closeSideBar());
  }

  private _initialize(): void {
    this.menuList = [
      {name: 'Mis Mascotas', icon: 'fa-paw', url: '/secure/pet'},
      {name: 'Vacunas', icon: 'fa-syringe', url: '/secure/pet/vaccine/all-vaccines'},
      {name: 'Tratamientos', icon: 'fa-kit-medical', url: '/secure/pet/treatment/all-treatments'},
      {name: 'Consejos', icon: 'fa-book-bookmark', url: '/secure/tips'},
      {name: 'Notas', icon: 'fa-note-sticky', url: '/secure/notes'},
      {name: 'Tareas', icon: 'fa-note-sticky', url: '/secure/tasks'},
      {name: 'Agenda', icon: 'fa-calendar-days', url: '/secure/agenda'},
    ]
  }
}
