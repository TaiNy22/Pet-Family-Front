import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.scss']
})
export class PetsListComponent implements OnInit {

  public showTableList: boolean;

  constructor() {
    this.showTableList = false;
  }

  ngOnInit(): void {
  }

  public toggleTableList(): void {
    this.showTableList = !this.showTableList;
  }
}
