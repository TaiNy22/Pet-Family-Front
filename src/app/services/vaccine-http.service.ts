import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {TokenStorageService} from "./token-storage.service";
import {Pet} from "../models/pet";
import {Vaccine} from "../models/vaccine";

@Injectable({
  providedIn: 'root'
})
export class VaccineHttpService {
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

  create(vaccine: any): Observable<Vaccine> {
    return this.httpClient.post<Vaccine>(environment.apiUrl + '/vaccines', JSON.stringify(vaccine), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Encontrar por ID
  getById(id: string): Observable<Vaccine> {
    return this.httpClient.get<Vaccine>(environment.apiUrl + '/vaccines/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Encontrar por ID de pet
  getByPetId(id: string): Observable<Vaccine[]> {
    return this.httpClient.get<Vaccine[]>(environment.apiUrl + '/vaccines/pet/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getAll(): Observable<Vaccine[]> {
    return this.httpClient.get<Vaccine[]>(environment.apiUrl + '/vaccines', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Editar por id
  edit(id: number, vaccine: any): Observable<Vaccine> {
    return this.httpClient.put<Vaccine>(environment.apiUrl + '/vaccines/' + id, JSON.stringify(vaccine), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Eliminar por id
  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(environment.apiUrl + '/vaccines/' + id, this.httpOptions)
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
