import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {RoleUser} from '../models/user';
import {TokenStorageService} from '../services/token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user: any = this.tokenStorageService.getUser;

    if (user() !== null) {
      console.log(user().roles.indexOf(RoleUser.ADMIN) !== -1);
      if (user().roles.indexOf(RoleUser.ADMIN) !== -1) {
        return true;
      }

      return true;
    }

    // no ha iniciado sesión, así que redirija a la página de inicio de sesión con la URL de retorno
    this.router.navigate(['/public/sign-in'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}

