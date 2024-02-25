import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../../../models/user";
import {Tip} from "../../../../../models/tip";
import {PetTypeEnum} from "../../../../../models/pet-type.enum";

@Component({
  selector: 'app-tip-add',
  templateUrl: './tip-add.component.html',
  styleUrls: ['./tip-add.component.scss']
})
export class TipAddComponent implements OnInit {

  @Input() public user!: User;
  @Input() public tipEdit!: Tip | undefined;
  @Input() public editModeActive: boolean;

  @Output() public cancelAdd: EventEmitter<void>;
  @Output() public emitTip: EventEmitter<any>;

  public content: string;
  public petType: PetTypeEnum;
  public title: string;
  public petTypeSelected: string;

  public petsType = ['Todos', 'Ave', 'Gato', 'Perro', 'Pez', 'Roedor', 'Otro'];

  constructor() {
    this.cancelAdd = new EventEmitter<void>();
    this.emitTip = new EventEmitter<any>();
    this.petType = PetTypeEnum.ALL;
    this.editModeActive = false;
    this.petTypeSelected = '';
    this.content = '';
    this.title = '';
  }

  public ngOnInit(): void {
    if (this.tipEdit && this.editModeActive) {
      this.content = this.tipEdit.content;
      this.title = this.tipEdit.title;
      this.petType = this.tipEdit.type;
    }
  }

  public saveTip(): void {
    if (!this.content.length) {
      return;
    }

    this.emitTip.emit({
      title: this.title,
      content: this.content,
      type: this.petType
    });
  }

  public cancel(): void {
    this.title = '';
    this.content = '';

    this.cancelAdd.emit();
  }

  public addPetType(type: string): void {
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

    this.petType = petType;
  }
}
