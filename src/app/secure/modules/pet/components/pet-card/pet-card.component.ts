import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pet} from "../../../../../models/pet";

@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.scss']
})
export class PetCardComponent implements OnInit {
  @Input() public pet!: Pet;

  @Output() public editPet: EventEmitter<number>;
  @Output() public deletePet: EventEmitter<number>;
  @Output() public openPet: EventEmitter<number>;

  public showOptions: boolean;

  constructor() {
    this.deletePet = new EventEmitter<number>();
    this.editPet = new EventEmitter<number>();
    this.openPet = new EventEmitter<number>();
    this.showOptions = false;
  }

  ngOnInit(): void {
  }

  public selectPet(): void {
    this.openPet.emit(this.pet.id);
  }

  public toggleShowOptions(): void {
    this.showOptions = true;
  }

  public hideOptions(): void {
    this.showOptions = false;
  }

  public editPetAction(): void {
    this.editPet.emit(this.pet.id);
  }

  public deletePetAction(): void {
    this.deletePet.emit(this.pet.id);
  }
}
