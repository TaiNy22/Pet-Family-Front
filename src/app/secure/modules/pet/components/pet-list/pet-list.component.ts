import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PetHttpService} from "../../../../../services/pet-http.service";
import {take} from "rxjs";
import {Pet} from "../../../../../models/pet";
import {TokenStorageService} from "../../../../../services/token-storage.service";

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss']
})
export class PetListComponent implements OnInit {
  public animalTypes: string[];
  public petList: Pet[];
  public showTableList: boolean;

  constructor(private tokenStorageService: TokenStorageService,
              private petService: PetHttpService,
              private router: Router) {
    this.showTableList = false;
    this.animalTypes = [];
    this.petList = [];
  }

  ngOnInit(): void {
    this._initialize();
    this.animalTypes = ['Ave', 'Gato', 'Perro', 'Pez', 'Roedor', 'Otro...'];
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
        },
        error: (err) => console.log(err)
      })
  }

  private _deleteFromList(petId: number): void {
    this.petList = this.petList.filter((pet: Pet) => pet.id !== petId);
  }
}
