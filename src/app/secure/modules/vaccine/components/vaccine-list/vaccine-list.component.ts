import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Vaccine} from "../../../../../models/vaccine";
import {VaccineHttpService} from "../../../../../services/vaccine-http.service";
import {take} from "rxjs";

@Component({
  selector: 'app-vaccine-list',
  templateUrl: './vaccine-list.component.html',
  styleUrls: ['./vaccine-list.component.scss']
})
export class VaccineListComponent implements OnInit {

  public editModeActive: boolean;
  public petId: string;
  public showAddVaccine: boolean;
  public vaccineList: Vaccine[];
  public vaccineToEdit!: Vaccine | undefined;

  constructor(private vaccineService: VaccineHttpService,
              private activeRoute: ActivatedRoute,
              private router: Router) {
    this.editModeActive = false;
    this.showAddVaccine = false;
    this.vaccineList = [];
    this.petId = '';
  }

  public ngOnInit(): void {
    this.petId = this.activeRoute.snapshot.paramMap.get('id') as string;

    this._findVaccinesByPet();
  }

  public closePet(): void {
    this.router.navigate(['/secure/pet/pet-info/' + this.petId]).then();
  }

  public editVaccine(vaccine: Vaccine): void {
    this.vaccineToEdit = vaccine;
    this.editModeActive = true;
    this.showAddVaccine = true;
  }

  public saveEditVaccine(vaccine: any): void {
    if (!this.vaccineToEdit) {
      return;
    }

    this.vaccineService.edit(this.vaccineToEdit.id, vaccine).pipe(take(1))
      .subscribe({
        next: (vaccine: Vaccine) => {
          if (!this.vaccineToEdit) {
            return;
          }

          this.vaccineList[this.vaccineList.indexOf(this.vaccineToEdit)] = vaccine;
          this.showAddVaccine = false;
          this.editModeActive = false;
          this.vaccineToEdit = undefined;
        },
        error: (err) => console.log(err)
      });
  }

  public saveNewVaccine(vaccine: any): void {
    if (this.editModeActive) {
      this.saveEditVaccine(vaccine);
    } else {
      this.vaccineService.create(vaccine).pipe(take(1))
        .subscribe({
          next: (vaccine: Vaccine) => {
            this.vaccineList.unshift(vaccine);
            this.showAddVaccine = false;
          },
          error: (err) => console.log(err)
        });
    }
  }

  public addVaccineModal(): void {
    this.showAddVaccine = true;
  }

  public cancelAddVaccine(): void {
    this.showAddVaccine = false;
    this.editModeActive = false;
  }

  public deleteVaccine(vaccine: Vaccine): void {
    this.vaccineService.delete(vaccine.id).pipe(take(1)).subscribe();

    this.vaccineList.splice(this.vaccineList.indexOf(vaccine), 1);
  }

  private _findVaccinesByPet(): void {
    this.vaccineService.getByPetId(this.petId)
      .pipe(take(1))
      .subscribe({
        next: (vaccines: Vaccine[]) => {
          this.vaccineList = vaccines.reverse();
        },
        error: (err) => console.log(err)
      })
  }
}
