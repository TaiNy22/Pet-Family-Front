import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Vaccine} from "../../../../../models/vaccine";

@Component({
  selector: 'app-vaccine-add',
  templateUrl: './vaccine-add.component.html',
  styleUrls: ['./vaccine-add.component.scss']
})
export class VaccineAddComponent implements OnInit {
  @Input() public petId!: string;
  @Input() public vaccineEdit!: Vaccine | undefined;
  @Input() public editModeActive: boolean;

  @Output() public cancelAdd: EventEmitter<void>;
  @Output() public emitVaccine: EventEmitter<any>;

  public date: Date;
  public done: boolean;
  public vaccine: string;

  constructor() {
    this.emitVaccine = new EventEmitter<any>();
    this.cancelAdd = new EventEmitter<void>();
    this.editModeActive = false;
    this.date = new Date();
    this.vaccine = '';
    this.done = false;
  }

  public ngOnInit() {
    if (this.vaccineEdit && this.editModeActive) {
      this.vaccine = this.vaccineEdit.type;
      this.date = this.vaccineEdit.date;
      this.done = this.vaccineEdit.done;
    }
  }

  public saveVaccine(): void {
    if (!this.vaccine.length) {
      return;
    }

    this.emitVaccine.emit({
      type: this.vaccine,
      date: this.date,
      done: this.done,
      petId: this.petId
    });
  }

  public cancel(): void {
    this.date = new Date();
    this.vaccine = '';
    this.done = false;

    this.cancelAdd.emit();
  }
}
