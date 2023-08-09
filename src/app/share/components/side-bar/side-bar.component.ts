import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Output() public close: EventEmitter<void>;

  public menuList: any[] = [];

  constructor(private tokenStorageService: TokenStorageService) {
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

  private _initialize(): void {
    this.menuList = [
      {name: 'Mis Mascotas', icon: 'fa-paw', url: ''},
      {name: 'Vacunas', icon: 'fa-syringe', url: ''},
      {name: 'Tratamientos', icon: 'fa-kit-medical', url: ''},
      {name: 'Consejos', icon: 'fa-book-bookmark', url: ''},
      {name: 'Notas', icon: 'fa-note-sticky', url: ''},
      {name: 'Agenda', icon: 'fa-calendar-days', url: ''},
    ]
  }
}
