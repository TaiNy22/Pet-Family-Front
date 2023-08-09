import {Component, Input, OnInit} from '@angular/core';
import {Tip} from "../../../../../models/tip";

@Component({
  selector: 'app-pet-tips-list',
  templateUrl: './pet-tips-list.component.html',
  styleUrls: ['./pet-tips-list.component.scss']
})
export class PetTipsListComponent implements OnInit {

  @Input() public tips: Tip[];

  constructor() {
    this.tips = [];
  }

  ngOnInit(): void {
  }

}
