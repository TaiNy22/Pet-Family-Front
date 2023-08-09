import {Component, OnInit} from '@angular/core';
import {TOGGLESIDEBAR} from "./animations/side-bar.animation";
import {take, timer} from "rxjs";

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss'],
  animations: [TOGGLESIDEBAR]
})
export class SecureComponent implements OnInit {

  public showSideBar: boolean;
  public showSideBarBg: boolean;

  constructor() {
    this.showSideBarBg = false;
    this.showSideBar = false;
  }

  ngOnInit(): void {
  }

  public closeSideBar(): void {
    this.showSideBar = false

    timer(500).pipe(take(1))
      .subscribe(() => this.showSideBarBg = false)
  }

  public openSideBar(): void {
    this.showSideBar = true;
    this.showSideBarBg = true;
  }
}
