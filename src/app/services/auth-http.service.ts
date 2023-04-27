import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {UserToken} from "../models/user-token";
import {User} from "../models/user";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private _httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
              private router: Router) {
  }

  public login(username: string, password: string): Observable<UserToken> {
    return this.http.post<UserToken>(environment.apiUrl + '/auth/signin', { username, password }, this._httpOptions)
      .pipe(take(1));
  }

  // TODO devuelve {message: string} quiza se deba recibir tokken para guardarlo
  public register(user: User): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/auth/signup', JSON.stringify(user), this._httpOptions)
      .pipe(take(1));
  }
}
