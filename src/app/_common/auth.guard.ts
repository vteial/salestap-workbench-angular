import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {WydApiService} from "./wyd-api.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private apiService: WydApiService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.apiService.currentSession) return true;
    this.router.navigate(['/sign-in'],
      {
        queryParams: {
          returnUrl: state.url
        }
      }).finally(() => {
    });
    return false;
  }
}
