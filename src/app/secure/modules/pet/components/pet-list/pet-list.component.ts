import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Routes} from "@angular/router";

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss']
})
export class PetListComponent implements OnInit {
  public showTableList: boolean;
  public animalTypes: string[];

  constructor(private router: Router) {
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
    this.router.navigate(['/secure/pet/pet-form']).then(r => console.log('add'));
  }
}
