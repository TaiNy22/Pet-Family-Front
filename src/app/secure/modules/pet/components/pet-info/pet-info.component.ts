import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pet} from "../../../../../models/pet";
import {Router} from "@angular/router";
import {PetHttpService} from "../../../../../services/pet-http.service";
import {FileHttpService} from "../../../../../services/file-http.service";
import {take} from "rxjs";

@Component({
  selector: 'app-pet-info',
  templateUrl: './pet-info.component.html',
  styleUrls: ['./pet-info.component.scss']
})
export class PetInfoComponent implements OnInit {

  @Input() public pet!: Pet;

  @Output() public closePetInfo: EventEmitter<boolean>;

  public imageAvatar!: any;
  public typePet: string;

  constructor(private fileHttpService: FileHttpService,
              private petService: PetHttpService,
              private router: Router) {
    this.closePetInfo = new EventEmitter<boolean>();
    this.typePet = '';
  }

  public ngOnInit() {
    this._getImage();
  }

  public closePet(): void {
    this.closePetInfo.emit(false);
  }

  public editPet(petId: number): void {
    this.router.navigate(['/secure/pet/pet-edit/' + petId]).then();
  }

  public deletePet(petId: number): void {
    this.petService.delete(petId.toString()).subscribe(() => {
      this.router.navigate(['/secure/pet/pet-list']).then();
    });
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
