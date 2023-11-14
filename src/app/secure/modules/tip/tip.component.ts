import {Component, OnInit} from '@angular/core';
import {TipHttpService} from "../../../services/tip-http.service";
import {take} from "rxjs";
import {Tip} from "../../../models/tip";
import {PetTypeEnum} from "../../../models/pet-type.enum";

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.scss']
})
export class TipComponent implements OnInit {

  public allTips: Tip[];
  public tipsFiltered: Tip[];
  public petTypeSelected: string;

  public readonly petsType: string[] = ['Todos', 'Perro', 'Gato', 'Ave', 'Roedor', 'Pez'];
  public readonly EMPTY: string = '';

  constructor(private tipHttpService: TipHttpService) {
    this.petTypeSelected = this.EMPTY;
    this.tipsFiltered = [];
    this.allTips = [];
  }

  public ngOnInit(): void {
    this._getAllTips();
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
