import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PetHttpService} from "../../../../../services/pet-http.service";
import {take} from "rxjs";
import {TokenStorageService} from "../../../../../services/token-storage.service";
import {FileHttpService} from "../../../../../services/file-http.service";

@Component({
  selector: 'app-pet-add',
  templateUrl: './pet-add.component.html',
  styleUrls: ['./pet-add.component.scss']
})
export class PetAddComponent implements OnInit {

  public petForm!: FormGroup;
  public submitted: boolean;

  private _uploadedImage!: File | undefined;
  private _avatarName: string;

  constructor(private tokenStorageService: TokenStorageService,
              private fileHttpService: FileHttpService,
              private petService: PetHttpService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.submitted = false;
    this._avatarName = '';
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

    this.petService.create(this.petForm.value)
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
    this.router.navigate(['/secure/pet/pet-list']).then();
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
    this._newForm();
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
