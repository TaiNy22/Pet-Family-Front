import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Pet} from "../../../../../models/pet";
import {Treatment} from "../../../../../models/treatment";
import {PetHttpService} from "../../../../../services/pet-http.service";
import {take} from "rxjs";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-treatment-report',
  templateUrl: './treatment-report.component.html',
  styleUrls: ['./treatment-report.component.scss']
})
export class TreatmentReportComponent implements OnInit {

  @Input() public petId!: string;
  @Input() public treatment!: Treatment;

  @Output() public close: EventEmitter<void>;

  @ViewChild('report', {static: false}) public report!: ElementRef;

  public pet!: Pet;

  constructor(private petService: PetHttpService) {
    this.close = new EventEmitter<void>();
  }

  public ngOnInit(): void {
    this._getPet();
  }

  public closeReport(): void {
    this.close.emit();
  }

  private _getPet(): void {
    this.petService.getById(this.petId)
      .pipe(take(1))
      .subscribe((pet: Pet) => {
        this.pet = pet;
      });
  }

  public downloadPDF(): void {
    if (!this.report) {
      return;
    }

    const doc: jsPDF = new jsPDF('p', 'mm', 'letter');

    const pdfReport = this.report.nativeElement;

    html2canvas(pdfReport, {}).then((canvas: HTMLCanvasElement) => {
      const img = canvas.toDataURL(('image/PNG'));

      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${this.pet.name}_report_${new Date().toISOString()}.pdf`);
    });

  }
}
