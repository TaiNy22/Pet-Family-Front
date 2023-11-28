import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../../../../services/token-storage.service";
import {PetHttpService} from "../../../../../services/pet-http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {take} from "rxjs";
import {Pet} from "../../../../../models/pet";
import {FileHttpService} from "../../../../../services/file-http.service";

@Component({
  selector: 'app-pet-edit-form',
  templateUrl: './pet-edit-form.component.html',
  styleUrls: ['./pet-edit-form.component.scss']
})
export class PetEditFormComponent implements OnInit {

  public pet!: Pet;
  public petId: string;
  public petForm!: FormGroup;
  public submitted: boolean;

  private _uploadedImage!: File;

  constructor(private tokenStorageService: TokenStorageService,
              private fileHttpService: FileHttpService,
              private activeRoute: ActivatedRoute,
              private petService: PetHttpService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.submitted = false;
    this.petId = '';
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
    this.petService.edit(this.petId, this.petForm.value)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this._imageUploadAction();
          this.router.navigate(['/secure/pet/pet-list']).then();
        },
        error: (err) => console.log(err)
      })
  }

  public cancelAdd(): void {
    this.router.navigate(['/secure/pet/pet-info/' + this.petId]).then();
  }

  public onImageUpload(event: any) {
    this._uploadedImage = event.target.files[0];
    this.form['avatar'].setValue(event.target.files[0].name);
  }

  private _initialize(): void {
    this.petId = this.activeRoute.snapshot.paramMap.get('id') as string;

    this._newForm();
    this._readPet();
  }

  private _readPet(): void {
    this.petService.getById(this.petId)
      .pipe(take(1))
      .subscribe({
        next: (pet: Pet) => {
          this.pet = pet;
          this._fillForm();
        },
        error: (err) => console.log(err)
      })
  }

  private _newForm(): void {
    this.petForm = this.formBuilder.group({
      age: [''],
      avatar: [''],
      gender: ['', Validators.required],
      name: ['', Validators.required],
      sterilization: [false],
      type: ['', Validators.required],
      weight: [''],
      userId: [this.tokenStorageService.getUser()?.id]
    });
  }

  private _fillForm(): void {
    this.petForm = this.formBuilder.group({
      age: [this.pet.age],
      avatar: [this.pet.avatar],
      gender: [this.pet.gender, Validators.required],
      name: [this.pet.name, Validators.required],
      sterilization: [this.pet.sterilization],
      type: [this.pet.type, Validators.required],
      userId: [this.tokenStorageService.getUser()?.id],
      weight: [this.pet.weight]
    });
  }

  private _imageUploadAction(): void {
    const imageFormData = new FormData();
    imageFormData.append('image', this._uploadedImage, this._uploadedImage.name);

    this.fileHttpService.upload(imageFormData)
      .pipe(take(1))
      .subscribe((response) => {
        if (response.status !== 200) {
          console.warn('Image not uploaded due to some error!')
        }
      });
  }
}
