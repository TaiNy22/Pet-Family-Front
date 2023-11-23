import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private currentUser: BehaviorSubject<any>;

  constructor(private router: Router) {
    const user: any = window.sessionStorage.getItem(USER_KEY);
    this.currentUser = new BehaviorSubject<any>(user);
    this.currentUser.next(user);
  }

  signOut(): void {
    this.router.navigate(['/public/sign-in']);
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));

    this.currentUser.next(user);
  }

  public getUser(): User | null {
    const user: any = window.sessionStorage.getItem(USER_KEY);

    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  public listenCurrentUser(): Observable<any> {
    return this.currentUser.asObservable();
  }
}
