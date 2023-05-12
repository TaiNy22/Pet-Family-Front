import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {TokenStorageService} from "./token-storage.service";
import {Pet} from "../models/pet";

@Injectable({
  providedIn: 'root'
})
export class PetHttpService {
  private readonly token: string | null = this.tokenStorageService.getToken();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  };

  constructor(private tokenStorageService: TokenStorageService,
              private httpClient: HttpClient) {
  }

  create(pet: FormGroup): Observable<void> {
    return this.httpClient.post<void>(environment.apiUrl + '/pets', JSON.stringify(pet), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Encontrar por ID
  getById(id: string): Observable<Pet> {
    return this.httpClient.get<Pet>(environment.apiUrl + '/pets/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Encontrar por ID de usuario
  getByUserId(id: string): Observable<Pet[]> {
    return this.httpClient.get<Pet[]>(environment.apiUrl + '/pets/user/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Obtener todos los pets
  getAll(): Observable<Pet[]> {
    return this.httpClient.get<Pet[]>(environment.apiUrl + '/pets', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Editar pets por su id
  edit(id: string, pet: FormData): Observable<Pet> {
    return this.httpClient.put<Pet>(environment.apiUrl + '/pets/' + id, JSON.stringify(pet), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Eliminar pets por su id
  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(environment.apiUrl + '/pets/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = error.error.message;
    }
    return throwError(errorMessage);
  }
}
