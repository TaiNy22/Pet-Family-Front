import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {TokenStorageService} from "./token-storage.service";
import {Tip} from "../models/tip";
import {PetTypeEnum} from "../models/pet-type.enum";

@Injectable({
  providedIn: 'root'
})
export class TipHttpService {
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

  create(tip: Tip): Observable<Tip> {
    return this.httpClient.post<Tip>(environment.apiUrl + '/tips', JSON.stringify(tip), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Encontrar por ID
  getById(id: string): Observable<Tip> {
    return this.httpClient.get<Tip>(environment.apiUrl + '/tips/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Encontrar por tipo de pet
  getByPetType(petType: PetTypeEnum): Observable<Tip[]> {
    return this.httpClient.get<Tip[]>(environment.apiUrl + '/tips/type/' + petType, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getAll(): Observable<Tip[]> {
    return this.httpClient.get<Tip[]>(environment.apiUrl + '/tips', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Editar por id
  edit(id: number, tip: Tip): Observable<Tip> {
    return this.httpClient.put<Tip>(environment.apiUrl + '/tips/' + id, JSON.stringify(tip), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Eliminar por id
  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(environment.apiUrl + '/tips/' + id, this.httpOptions)
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
