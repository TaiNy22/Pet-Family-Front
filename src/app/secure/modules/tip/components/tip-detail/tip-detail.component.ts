import {Component, Input, OnInit} from '@angular/core';
import {Tip} from "../../../../../models/tip";

@Component({
  selector: 'app-tip-detail',
  templateUrl: './tip-detail.component.html',
  styleUrls: ['./tip-detail.component.scss']
})
export class TipDetailComponent implements OnInit {

  @Input() public tip!: Tip;

  constructor() {
  }

  ngOnInit(): void {
  }

}
