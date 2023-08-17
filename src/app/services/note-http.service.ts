import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {TokenStorageService} from "./token-storage.service";
import {Note} from "../models/note";

@Injectable({
  providedIn: 'root'
})
export class NoteHttpService {
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

  create(note: Note): Observable<Note> {
    return this.httpClient.post<Note>(environment.apiUrl + '/notes', JSON.stringify(note), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Encontrar por ID
  getById(id: string): Observable<Note> {
    return this.httpClient.get<Note>(environment.apiUrl + '/notes/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Encontrar por usuario
  getByUserId(userId: string): Observable<Note[]> {
    return this.httpClient.get<Note[]>(environment.apiUrl + '/notes/user/' + userId, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getAll(): Observable<Note[]> {
    return this.httpClient.get<Note[]>(environment.apiUrl + '/notes', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Editar por id
  edit(id: number, note: Note): Observable<Note> {
    return this.httpClient.put<Note>(environment.apiUrl + '/notes/' + id, JSON.stringify(note), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Eliminar por id
  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(environment.apiUrl + '/notes/' + id, this.httpOptions)
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
