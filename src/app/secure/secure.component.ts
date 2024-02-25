import {Component, OnDestroy, OnInit} from '@angular/core';
import {TOGGLESIDEBAR} from "./animations/side-bar.animation";
import {interval, Subscription, take, timer} from "rxjs";
import {TipHttpService} from "../services/tip-http.service";
import {Tip} from "../models/tip";
import {TreatmentHttpService} from "../services/treatment-http.service";
import {TokenStorageService} from "../services/token-storage.service";
import {User} from "../models/user";
import {Treatment} from "../models/treatment";
import {WhatsappApiHttpService} from "../services/whatsapp-api-http.service";
import {Pet} from "../models/pet";

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
  public allTreatmentsByUser: Treatment[];

  private _loggedUser!: User | null;
  private _timerSubscription: Subscription;
  private _reminderSubject: Subscription;

  private readonly _TIME_REMINDER: number = 86400000;

  constructor(private treatmentService: TreatmentHttpService,
              private whatsappApiHttpService: WhatsappApiHttpService,
              private tokenStorageService: TokenStorageService,
              private tipService: TipHttpService) {
    this._timerSubscription = new Subscription();
    this._reminderSubject = new Subscription();
    this.allTreatmentsByUser = [];
    this.showSideBarBg = false;
    this.showSideBar = false;
    this.showTips = true;
  }

  ngOnInit(): void {
    this._loggedUser = this.tokenStorageService.getUser();

    this.getTipsRandom();
    this._getAllTreatmentsByUser();
    this._listenTreatmentsReminders();
  }

  ngOnDestroy() {
    this._timerSubscription.unsubscribe();
    this._reminderSubject.unsubscribe();
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

  private _getAllTreatmentsByUser(): void {
    if (this._loggedUser === null) {
      return;
    }

    this.treatmentService.getAllByUser(this._loggedUser.id as number)
      .pipe(take(1))
      .subscribe((treatments: Treatment[]) => {
        this.allTreatmentsByUser = treatments;
      });
  }

  private _listenTreatmentsReminders(): void {
    this._reminderSubject = interval(1000)
      //TODO cambiar tiempo para el final
      // interval(this._TIME_REMINDER)
      .pipe(take(1))
      .subscribe(() => {
        this._analiseReminder();
      });
  }

  private _analiseReminder(): void {
    const date: Date = new Date(Date.now());

    this.allTreatmentsByUser = this.allTreatmentsByUser.filter((treatment: Treatment) => treatment.nextDate && new Date(treatment.nextDate).toISOString() >= date.toISOString());

    this.allTreatmentsByUser.forEach((treatment: Treatment) => {
      if (treatment.nextDate) {
        let daysToDate: number = new Date(treatment.nextDate).getTime() - date.getTime();

        daysToDate = Math.trunc(daysToDate / (1000 * 60 * 60 * 24) + 2);
console.log(daysToDate)
        this._sendMessage(daysToDate.toString(), treatment.pet, treatment);
      }
    });
  }

  private _sendMessage(days: string, pet: Pet, treatment: Treatment): void {
    if (this._loggedUser === null || !this._loggedUser.phone) {
      return;
    }

    switch (days) {
      case '0':
        if (treatment.reminder !== '0') {
          this.whatsappApiHttpService.sendMessage(this._loggedUser.phone.toString(), 'recordatorio_horas', days, pet.name);
          this._updateTreatmentRequest(treatment, pet.id, '0')
        }
        break;
      case '1':
        if (treatment.reminder !== '1') {
          this.whatsappApiHttpService.sendMessage(this._loggedUser.phone.toString(), 'recordatorio', days, pet.name);
          this._updateTreatmentRequest(treatment, pet.id, '1')
        }
        break;
      case '3':
        if (treatment.reminder !== '3') {
          this.whatsappApiHttpService.sendMessage(this._loggedUser.phone.toString(), 'recordatorio_dias', days, pet.name);
          treatment.reminder = '3';
          this._updateTreatmentRequest(treatment, pet.id, '3')
        }
        break;
      case '7':
        debugger
        if (treatment.reminder !== '7') {
          this.whatsappApiHttpService.sendMessage(this._loggedUser.phone.toString(), 'recordatorio_dias', days, pet.name);
          this._updateTreatmentRequest(treatment, pet.id, '7')
        }
        break;
      default:
        break;
    }
  }

  private _updateTreatmentRequest(treatment: Treatment, petId: number, day: string): any {
    const treatmentRequest: any= {
      title: treatment.title,
      date: treatment.date,
      description: treatment.description,
      nextDate: treatment.nextDate,
      petId: petId,
      reminder: day
    }

    this.treatmentService.edit(treatment.id, treatmentRequest)
      .pipe(take(1))
      .subscribe();
  }
}
