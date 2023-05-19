import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Pet} from "../../../../../models/pet";
import {Router} from "@angular/router";
import {PetHttpService} from "../../../../../services/pet-http.service";

@Component({
  selector: 'app-pet-info',
  templateUrl: './pet-info.component.html',
  styleUrls: ['./pet-info.component.scss']
})
export class PetInfoComponent {

  @Input() public pet!: Pet;

  @Output() public closePetInfo: EventEmitter<boolean>;

  public typePet: string;

  constructor(private petService: PetHttpService,
              private router: Router) {
    this.closePetInfo = new EventEmitter<boolean>();
    this.typePet = '';
  }

  public closePet(): void {
    this.closePetInfo.emit(false);
  }

  public editPet(petId: number): void {
    this.router.navigate(['/secure/pet/pet-edit/' + petId]).then();
  }

  public deletePet(petId: number): void {
    this.petService.delete(petId.toString()).subscribe();
  }
}
