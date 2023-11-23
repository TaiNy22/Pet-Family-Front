import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Treatment} from "../../../../../models/treatment";

@Component({
  selector: 'app-treatment-add',
  templateUrl: './treatment-add.component.html',
  styleUrls: ['./treatment-add.component.scss']
})
export class TreatmentAddComponent implements OnInit {
  @Input() public petId!: string;
  @Input() public treatmentEdit!: Treatment | undefined;
  @Input() public editModeActive: boolean;

  @Output() public cancelAdd: EventEmitter<void>;
  @Output() public emitTreatment: EventEmitter<any>;

  public date: Date;
  public nextDate: Date;
  public description: string;
  public title: string;

  constructor() {
    this.emitTreatment = new EventEmitter<any>();
    this.cancelAdd = new EventEmitter<void>();
    this.editModeActive = false;
    this.nextDate = new Date();
    this.description = '';
    this.date = new Date();
    this.title = '';
  }

  public ngOnInit() {
    if (this.treatmentEdit && this.editModeActive) {
      this.title = this.treatmentEdit.title;
      this.description = this.treatmentEdit.description;
      this.date = this.treatmentEdit.date;
      this.nextDate = this.treatmentEdit.nextDate;
    }
  }

  public saveTreatment(): void {
    if (!this.title.length) {
      return;
    }

    this.emitTreatment.emit({
      title: this.title,
      date: this.date,
      description: this.description,
      nextDate: this.nextDate,
      petId: this.petId
    });
  }

  public cancel(): void {
    this.date = new Date();
    this.nextDate = new Date();
    this.title = '';
    this.description = '';

    this.cancelAdd.emit();
  }
}
