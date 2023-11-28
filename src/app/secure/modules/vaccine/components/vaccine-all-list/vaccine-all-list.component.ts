import {Component, OnInit} from '@angular/core';
import {Vaccine} from "../../../../../models/vaccine";
import {VaccineHttpService} from "../../../../../services/vaccine-http.service";
import {ActivatedRoute} from "@angular/router";
import {take} from "rxjs";
import {PetHttpService} from "../../../../../services/pet-http.service";

@Component({
  selector: 'app-vaccine-all-list',
  templateUrl: './vaccine-all-list.component.html',
  styleUrls: ['./vaccine-all-list.component.scss']
})
export class VaccineAllListComponent implements OnInit {
  public editModeActive: boolean;
  public showAddVaccine: boolean;
  public vaccineList: Vaccine[];
  public vaccineToEdit!: Vaccine | undefined;

  constructor(private vaccineService: VaccineHttpService,
              private activeRoute: ActivatedRoute,
              private petService: PetHttpService) {
    this.editModeActive = false;
    this.showAddVaccine = false;
    this.vaccineList = [];
  }

  public ngOnInit(): void {
    this._findAllVaccines();
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
            this.vaccineList.push(vaccine);
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

  private _findAllVaccines(): void {
    this.vaccineService.getAll()
      .pipe(take(1))
      .subscribe({
        next: (vaccines: Vaccine[]) => {
          this.vaccineList = vaccines;
          this._sortList();
        },
        error: (err) => console.log(err)
      })
  }

  private _sortList(): void {
    this.vaccineList.sort((a: Vaccine, b: Vaccine) => {
      const nameA: string = a.pet.name.toLowerCase();
      const nameB: string = b.pet.name.toLowerCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });
  }
}
