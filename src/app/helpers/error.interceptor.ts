import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {TokenStorageService} from '../services/token-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private readonly TOKEN_HEADER_KEY: string = 'Authorization';

  constructor(private tokenService: TokenStorageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = request;
    const token = this.tokenService.getToken();

    if (token != null) {
      // authReq = request.clone({headers: request.headers.set(this.TOKEN_HEADER_KEY, 'Bearer ' + token)});
    }

    return next.handle(authReq);
  }
}
