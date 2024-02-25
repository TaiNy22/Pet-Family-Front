import {Component, OnInit} from '@angular/core';
import {TipHttpService} from "../../../services/tip-http.service";
import {take} from "rxjs";
import {Tip} from "../../../models/tip";
import {PetTypeEnum} from "../../../models/pet-type.enum";
import {TokenStorageService} from "../../../services/token-storage.service";
import {RoleUser, User} from "../../../models/user";

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.scss']
})
export class TipComponent implements OnInit {

  public allTips: Tip[];
  public editModeActive: boolean;
  public tipToEdit: Tip | undefined;
  public tipsFiltered: Tip[];
  public petTypeSelected: string;
  public showAddTip: boolean;
  public userLogged!: User;

  public readonly petsType: string[] = ['Todos', 'Perro', 'Gato', 'Ave', 'Roedor', 'Pez'];
  public readonly role: typeof RoleUser = RoleUser;
  public readonly EMPTY: string = '';


  constructor(private tokenStorageService: TokenStorageService,
              private tipHttpService: TipHttpService) {
    this.petTypeSelected = this.EMPTY;
    this.editModeActive = false;
    this.showAddTip = false;
    this.tipsFiltered = [];
    this.allTips = [];
  }

  public ngOnInit(): void {
    this._getAllTips();
    this.userLogged = this.tokenStorageService.getUser() as User;
  }

  public addTip(): void {
    this.showAddTip = true;
  }

  public filterTips(type: string): void {
    if (type === 'Todos') {
      this.tipsFiltered = this.allTips;
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

    this.tipsFiltered = this.allTips.filter((tip: Tip) => petType === tip.type
    );
  }

  public cancelAddTip(): void {
    this.showAddTip = false;
    this.editModeActive = false;
  }

  public editTip(tip: Tip): void {
    this.tipToEdit = tip;
    this.editModeActive = true;
    this.showAddTip = true;
  }

  public deleteTip(tip: Tip): void {
    this.tipHttpService.delete(tip.id as number).pipe(take(1)).subscribe();

    this.allTips.splice(this.allTips.indexOf(tip), 1);
  }

  public saveNewTip(tip: any): void {
    if (this.editModeActive) {
      this.saveEditTip(tip);
    } else {
      this.tipHttpService.create(tip).pipe(take(1))
        .subscribe({
          next: (tip: Tip) => {
            this._getAllTips();
            this.showAddTip = false;
          },
          error: err => console.log(err)
        });
    }
  }

  private saveEditTip(tip: any): void {
    if (!this.tipToEdit) {
      return;
    }

    this.tipHttpService.edit(this.tipToEdit.id as number, tip).pipe(take(1))
      .subscribe({
        next: (tip: Tip) => {
          if (!this.tipToEdit) {
            return;
          }

          this._getAllTips();
          this.showAddTip = false;
          this.editModeActive = false;
          this.tipToEdit = undefined;
        },
        error: err => console.log(err)
      });
  }

  private _getAllTips(): void {
    this.tipHttpService.getAll().pipe(take(1))
      .subscribe({
        next: (tips: Tip[]) => {
          this.allTips = tips;
          this.tipsFiltered = tips;
        },
        error: err => console.log(err)
      });
  }
}
