import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pet} from "../../../../../models/pet";
import {FileHttpService} from "../../../../../services/file-http.service";
import {take} from "rxjs";

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

  public imageAvatar!: any;
  public showOptions: boolean;

  constructor(private fileHttpService: FileHttpService) {
    this.deletePet = new EventEmitter<number>();
    this.editPet = new EventEmitter<number>();
    this.openPet = new EventEmitter<number>();
    this.showOptions = false;
  }

  ngOnInit(): void {
    this._getImage();
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

  private _getImage(): void {
    if (this.pet.avatar === '') {
      return;
    }

    this.fileHttpService.getImage(this.pet.avatar)
      .pipe(take(1))
      .subscribe((image: any) => {
        this.imageAvatar = 'data:image/jpeg;base64,' + image.image;
      });
  }
}
