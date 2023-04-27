import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  create(user: FormGroup): Observable<any> {

    return this.httpClient.post<any>(environment.apiUrl + '/users', JSON.stringify(user), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Encontrar por ID
  getById(id: string): Observable<User> {
    return this.httpClient.get<User>(environment.apiUrl + '/users/' + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Obtener todos los usuarios
  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.apiUrl + '/users', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Editar usero por su id
  edit(id: string, user: FormData): Observable<any> {
    return this.httpClient.put<any>(environment.apiUrl + '/users/' + id, JSON.stringify(user), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Eliminar user por su id
  delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(environment.apiUrl + '/users/' + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // cambiar contrasena
  changePassword(id: string, password: string): Observable<string> {
    return this.httpClient.put<string>(environment.apiUrl + '/user/password/' + id, password)
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
