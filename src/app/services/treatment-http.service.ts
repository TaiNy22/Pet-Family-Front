import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {TokenStorageService} from "./token-storage.service";
import {Treatment} from "../models/treatment";

@Injectable({
  providedIn: 'root'
})
export class TreatmentHttpService {
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

  create(treatment: any): Observable<Treatment> {
    return this.httpClient.post<Treatment>(environment.apiUrl + '/treatments', JSON.stringify(treatment), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Encontrar por ID
  getById(id: string): Observable<Treatment> {
    return this.httpClient.get<Treatment>(environment.apiUrl + '/treatments/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Encontrar por ID de pet
  getByPetId(id: string): Observable<Treatment[]> {
    return this.httpClient.get<Treatment[]>(environment.apiUrl + '/treatments/pet/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getAll(): Observable<Treatment[]> {
    return this.httpClient.get<Treatment[]>(environment.apiUrl + '/treatments', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Editar por id
  edit(id: number, treatment: any): Observable<Treatment> {
    return this.httpClient.put<Treatment>(environment.apiUrl + '/treatments/' + id, JSON.stringify(treatment), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Eliminar por id
  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(environment.apiUrl + '/treatments/' + id, this.httpOptions)
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
