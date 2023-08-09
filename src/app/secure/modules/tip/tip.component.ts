import {Component, OnInit} from '@angular/core';
import {TipHttpService} from "../../../services/tip-http.service";
import {take} from "rxjs";
import {Tip} from "../../../models/tip";

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.scss']
})
export class TipComponent implements OnInit {

  public allTips: Tip[];

  public readonly pets: string[] = ['Perro', 'Gato', 'Ave', 'Roedor', 'Pez'];

  constructor(private tipHttpService: TipHttpService) {
    this.allTips = [];
  }

  public ngOnInit(): void {
    this._getAllTips();
  }

  public petSelected(pet: string): void {
    return;
  }

  private _getAllTips(): void {
    this.tipHttpService.getAll().pipe(take(1))
      .subscribe({
        next: (tips: Tip[]) => this.allTips = tips,
        error: err => console.log(err)
      });
  }
}
