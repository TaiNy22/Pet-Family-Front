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

  private _uploadedImage!: File | undefined;
  private _avatarName: string;

  constructor(private tokenStorageService: TokenStorageService,
              private fileHttpService: FileHttpService,
              private activeRoute: ActivatedRoute,
              private petService: PetHttpService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.submitted = false;
    this._avatarName = '';
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
          if (this._uploadedImage) {
            this._imageUploadAction();
          } else {
            this.router.navigate(['/secure/pet/pet-list']);
          }
        },
        error: (err) => console.log(err)
      })
  }

  public cancelAdd(): void {
    this.router.navigate(['/secure/pet/pet-info/' + this.petId]).then();
  }

  public onImageUpload(event: any) {
    this._uploadedImage = event.target.files[0];

    if (!this._uploadedImage) {
      return;
    }

    this._avatarName = event.target.files[0].name + '_' + Date.now();
    this.form['avatar'].setValue(this._avatarName);
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
      ageType: [''],
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
      ageType: [this.pet.ageType],
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
    if (this._uploadedImage === undefined) {
      return;
    }

    imageFormData.append('image', this._uploadedImage, this._avatarName);

    this.fileHttpService.upload(imageFormData)
      .pipe(take(1))
      .subscribe((response) => {
        if (response.status !== 200) {
          console.warn('Image not uploaded due to some error!')
        } else {
          this.router.navigate(['/secure/pet/pet-list']);
        }
      });
  }
}
