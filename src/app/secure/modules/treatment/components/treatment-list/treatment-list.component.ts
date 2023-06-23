import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {take} from "rxjs";
import {Treatment} from "../../../../../models/treatment";
import {TreatmentHttpService} from "../../../../../services/treatment-http.service";

@Component({
  selector: 'app-treatment-list',
  templateUrl: './treatment-list.component.html',
  styleUrls: ['./treatment-list.component.scss']
})
export class TreatmentListComponent implements OnInit {

  public editModeActive: boolean;
  public petId: string;
  public showAddTreatment: boolean;
  public treatmentList: Treatment[];
  public treatmentToEdit!: Treatment | undefined;

  constructor(private treatmentService: TreatmentHttpService,
              private activeRoute: ActivatedRoute,
              private router: Router) {
    this.editModeActive = false;
    this.showAddTreatment = false;
    this.treatmentList = [];
    this.petId = '';
  }

  public ngOnInit(): void {
    this.petId = this.activeRoute.snapshot.paramMap.get('id') as string;

    this._findTreatmentsByPet();
  }

  public closePet(): void {
    this.router.navigate(['/secure/pet/pet-info/' + this.petId]).then();
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

  private _findTreatmentsByPet(): void {
    this.treatmentService.getByPetId(this.petId)
      .pipe(take(1))
      .subscribe({
        next: (treatments: Treatment[]) => {
          this.treatmentList = treatments;
        },
        error: (err) => console.log(err)
      })
  }
}
