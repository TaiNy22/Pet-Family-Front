import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {TokenStorageService} from '../services/token-storage.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenStorageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if ([401, 403].indexOf(err.status) !== -1) {
          // cierre de sesión automático si la respuesta 401 no autorizada o 403 prohibida regresó de la API
          const currentUser = this.tokenService.getUser;
          if (currentUser === null) {
            this.tokenService.signOut;
          }
        }
        return throwError(err);
      }));
  }
}
