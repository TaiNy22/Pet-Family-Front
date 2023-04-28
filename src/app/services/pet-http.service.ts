import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {User} from '../models/user';
import {TokenStorageService} from "./token-storage.service";

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

  create(pet: FormGroup): Observable<any> {
    return this.httpClient.post<any>(environment.apiUrl + '/pets', JSON.stringify(pet), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Encontrar por ID
  getById(id: string): Observable<User> {
    return this.httpClient.get<User>(environment.apiUrl + '/pets/' + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Obtener todos los pets
  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.apiUrl + '/pets', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Editar pets por su id
  edit(id: string, user: FormData): Observable<any> {
    return this.httpClient.put<any>(environment.apiUrl + '/pets/' + id, JSON.stringify(user), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Eliminar pets por su id
  delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(environment.apiUrl + '/pets/' + id)
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
