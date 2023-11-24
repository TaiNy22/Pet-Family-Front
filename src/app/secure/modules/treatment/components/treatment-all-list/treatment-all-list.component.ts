import {Component, OnInit} from '@angular/core';
import {Treatment} from "../../../../../models/treatment";
import {TreatmentHttpService} from "../../../../../services/treatment-http.service";
import {take} from "rxjs";

@Component({
  selector: 'app-treatment-all-list',
  templateUrl: './treatment-all-list.component.html',
  styleUrls: ['./treatment-all-list.component.scss']
})
export class TreatmentAllListComponent implements OnInit {
  public editModeActive: boolean;
  public showAddTreatment: boolean;
  public treatmentList: Treatment[];
  public treatmentToEdit!: Treatment | undefined;

  constructor(private treatmentService: TreatmentHttpService) {
    this.editModeActive = false;
    this.showAddTreatment = false;
    this.treatmentList = [];
  }

  public ngOnInit(): void {
    this._findAllTreatments();
  }

  public editTreatment(treatment: Treatment): void {
    this.treatmentToEdit = treatment;
    this.editModeActive = true;
    this.showAddTreatment = true;
  }

  public saveEditTreatment(treatment: any): void {
    if (!this.treatmentToEdit) {
      return;
    }

    this.treatmentService.edit(this.treatmentToEdit.id, treatment).pipe(take(1))
      .subscribe({
        next: (treatment: Treatment) => {
          if (!this.treatmentToEdit) {
            return;
          }

          this.treatmentList[this.treatmentList.indexOf(this.treatmentToEdit)] = treatment;
          this.showAddTreatment = false;
          this.editModeActive = false;
          this.treatmentToEdit = undefined;
        },
        error: (err) => console.log(err)
      });
  }

  public saveNewTreatment(treatment: any): void {
    if (this.editModeActive) {
      this.saveEditTreatment(treatment);
    } else {
      this.treatmentService.create(treatment).pipe(take(1))
        .subscribe({
          next: (treatment: Treatment) => {
            this.treatmentList.push(treatment);
            this.showAddTreatment = false;
          },
          error: (err) => console.log(err)
        });
    }
  }

  public addTreatmentModal(): void {
    this.showAddTreatment = true;
  }

  public cancelAddTreatment(): void {
    this.showAddTreatment = false;
    this.editModeActive = false;
  }

  public deleteTreatment(treatment: Treatment): void {
    this.treatmentService.delete(treatment.id).pipe(take(1)).subscribe();

    this.treatmentList.splice(this.treatmentList.indexOf(treatment), 1);
  }

  private _findAllTreatments(): void {
    this.treatmentService.getAll()
      .pipe(take(1))
      .subscribe({
        next: (treatments: Treatment[]) => {
          this.treatmentList = treatments.reverse();
        },
        error: (err) => console.log(err)
      })
  }
}
