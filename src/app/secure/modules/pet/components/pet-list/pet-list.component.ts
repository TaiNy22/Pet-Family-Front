import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PetHttpService} from "../../../../../services/pet-http.service";
import {take} from "rxjs";
import {Pet} from "../../../../../models/pet";
import {TokenStorageService} from "../../../../../services/token-storage.service";
import {PetTypeEnum} from "../../../../../models/pet-type.enum";

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss']
})
export class PetListComponent implements OnInit {
  public petsType: string[];
  public petList: Pet[];
  public petsFiltered: Pet[];
  public showTableList: boolean;
  public petTypeSelected: string;

  constructor(private tokenStorageService: TokenStorageService,
              private petService: PetHttpService,
              private router: Router) {
    this.petTypeSelected = '';
    this.showTableList = false;
    this.petsFiltered = [];
    this.petsType = [];
    this.petList = [];
  }

  public ngOnInit(): void {
    this._initialize();
    this.petsType = ['Todos', 'Ave', 'Gato', 'Perro', 'Pez', 'Roedor', 'Otro...'];
  }

  public toggleTableList(): void {
    this.showTableList = !this.showTableList;
  }

  public addPet(): void {
    this.router.navigate(['/secure/pet/pet-add']).then();
  }

  public editPet(petId: number): void {
    this.router.navigate(['/secure/pet/pet-edit/' + petId]).then();
  }

  public selectPet(petId: number): void {
    this.router.navigate(['/secure/pet/pet-info/' + petId]).then();
  }

  public processGender(gender: string): string {
    switch (gender) {
      case 'male':
        return 'Masculino';
        break;
      case 'female':
        return 'Femenino';
        break;
      default:
        return 'Otro';
    }
  }

  public deletePet(petId: number): void {
    this.petService.delete(petId.toString()).subscribe();

    this._deleteFromList(petId);
  }

  private _initialize(): void {
    const userId: number = this.tokenStorageService.getUser()?.id as number;

    this.petService.getByUserId(userId.toString()).pipe(take(1))
      .subscribe({
        next: (pets: Pet[]) => {
          this.petList = pets;
          this._sortList();
        },
        error: (err) => console.log(err)
      })
  }

  private _deleteFromList(petId: number): void {
    this.petList = this.petList.filter((pet: Pet) => pet.id !== petId);
  }

  public filterTips(type: string): void {
    if (type === 'Todos') {
      this.petsFiltered = this.petList;
      return;
    }

    let petType: PetTypeEnum = PetTypeEnum.ALL;
    switch (type) {
      case 'Perro':
        petType = PetTypeEnum.DOG;
        break;
      case 'Gato':
        petType = PetTypeEnum.CAT;
        break;
      case 'Ave':
        petType = PetTypeEnum.BIRD;
        break;
      case 'Roedor':
        petType = PetTypeEnum.MOUSE;
        break;
      case 'Pez':
        petType = PetTypeEnum.FISH;
        break;
    }

    this.petsFiltered = this.petList.filter((pet: Pet) => petType === pet.type
    );
  }

  private _sortList(): void {
    this.petList.sort((a: Pet, b: Pet) => {
      const nameA: string = a.name.toLowerCase();
      const nameB: string = b.name.toLowerCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });

    this.petsFiltered = this.petList;
  }
}
