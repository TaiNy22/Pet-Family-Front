import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {TokenStorageService} from "./token-storage.service";
import {Task} from "../models/task";

@Injectable({
  providedIn: 'root'
})
export class TaskHttpService {
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

  create(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(environment.apiUrl + '/tasks', JSON.stringify(task), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Encontrar por ID
  getById(id: string): Observable<Task> {
    return this.httpClient.get<Task>(environment.apiUrl + '/tasks/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Encontrar por usuario
  getByUserId(userId: string): Observable<Task[]> {
    return this.httpClient.get<Task[]>(environment.apiUrl + '/tasks/user/' + userId, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getAll(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(environment.apiUrl + '/tasks', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Editar por id
  edit(id: number, task: Task): Observable<Task> {
    return this.httpClient.put<Task>(environment.apiUrl + '/tasks/' + id, JSON.stringify(task), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Eliminar por id
  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(environment.apiUrl + '/tasks/' + id, this.httpOptions)
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
