import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PetHttpService} from "../../../../../services/pet-http.service";
import {take} from "rxjs";

@Component({
  selector: 'app-pet-add',
  templateUrl: './pet-add.component.html',
  styleUrls: ['./pet-add.component.scss']
})
export class PetAddComponent implements OnInit {

  public petForm!: FormGroup;
  public submitted: boolean;

  constructor(private petService: PetHttpService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.submitted = false;
  }

  ngOnInit(): void {
    this._initialize();
  }

  public get form() {
    return this.petForm.controls;
  }

  public submit(): void {
    this.submitted = true;

    if (this.petForm.invalid) {
      return;
    }

    console.log('enviar', this.petForm.value)
    this.petService.create(this.petForm.value)
      .pipe(take(1))
      .subscribe({
        next: () => this.router.navigate(['/secure/pet/pet-list']),
        error: (err) => console.log(err)
      })
  }

  public cancelAdd(): void {
    this.router.navigate(['/secure/pet/pet-list'])
  }

  private _initialize(): void {
    this._newForm();
  }

  private _newForm(): void {
    this.petForm = this.formBuilder.group({
      age: [''],
      avatar: [''],
      gender: ['', Validators.required],
      name: ['', Validators.required],
      sterilization: [''],
      type: ['', Validators.required],
      weight: ['']
    });
  }
}
