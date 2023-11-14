import {Component, OnDestroy, OnInit} from '@angular/core';
import {TOGGLESIDEBAR} from "./animations/side-bar.animation";
import {interval, Subject, Subscription, take, takeUntil, timer} from "rxjs";
import {TipHttpService} from "../services/tip-http.service";
import {Tip} from "../models/tip";

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss'],
  animations: [TOGGLESIDEBAR]
})
export class SecureComponent implements OnInit, OnDestroy {

  public showSideBar: boolean;
  public showSideBarBg: boolean;
  public showTips: boolean;
  public tipDisplayed!: Tip;

  private _timerSubscription: Subscription;

  constructor(private tipService: TipHttpService) {
    this._timerSubscription = new Subscription();
    this.showSideBarBg = false;
    this.showSideBar = false;
    this.showTips = true;
  }

  ngOnInit(): void {
    this.getTipsRandom();
  }

  ngOnDestroy() {
    this._timerSubscription.unsubscribe();
  }

  public closeSideBar(): void {
    this.showSideBar = false

    timer(500).pipe(take(1))
      .subscribe(() => this.showSideBarBg = false)
  }

  public openSideBar(): void {
    this.showSideBar = true;
    this.showSideBarBg = true;
  }

  public getTipsRandom(): void {
    this._timerSubscription = interval(5000)
      .pipe()
      .subscribe(() => {
        this.tipService.getRandomTip().pipe(take(1))
          .subscribe((tip: Tip) => {
            this.tipDisplayed = tip;
          });
      });
  }

  public closeTips(): void {
    this.showTips = false;
    this._timerSubscription.unsubscribe();
  }
}
