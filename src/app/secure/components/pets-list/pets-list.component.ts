import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.scss']
})
export class PetsListComponent implements OnInit {

  public showTableList: boolean;
  public animalTypes: string[];

  constructor() {
    this.showTableList = false;
    this.animalTypes = [];
  }

  ngOnInit(): void {
    this.animalTypes = ['Ave', 'Gato', 'Perro', 'Pez', 'Roedor', 'Otro...'];
  }

  public toggleTableList(): void {
    this.showTableList = !this.showTableList;
  }

  public addPet(): void {
    console.log('aaaa')
  }
}
