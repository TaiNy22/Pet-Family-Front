import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {take} from "rxjs";
import {Pet} from "../../../../../models/pet";
import {PetHttpService} from "../../../../../services/pet-http.service";

@Component({
  selector: 'app-pet-view',
  templateUrl: './pet-view.component.html',
  styleUrls: ['./pet-view.component.scss']
})
export class PetViewComponent implements OnInit {

  public pet!: Pet;
  public petId: string;
  public showPetInfo: boolean;

  constructor(private activeRoute: ActivatedRoute,
              private petService: PetHttpService) {
    this.showPetInfo = false;
    this.petId = '';
  }

  public ngOnInit(): void {
    this._initialize();
  }

  public toggleShowPetInfo(value: boolean): void {
    this.showPetInfo = value;
  }

  private _initialize(): void {
    this.petId = this.activeRoute.snapshot.paramMap.get('id') as string;

    this._readPet();
  }

  private _readPet(): void {
    this.petService.getById(this.petId)
      .pipe(take(1))
      .subscribe({
        next: (pet: Pet) => {
          this.pet = pet;
        },
        error: (err) => console.log(err)
      })
  }
}
