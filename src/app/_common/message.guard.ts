import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {WydApiService} from "./wyd-api.service";

@Injectable()
export class MessageGuard implements CanActivate {

  constructor(private router: Router,
              private apiService: WydApiService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!route.fragment) return true;
    const params = MessageGuard.fromFragmentToParamMap(route.fragment);
    console.log(params);
    if (params['type'] === 'recovery')  {
      this.router.navigate(['/change-password'],
        {
          queryParams: {
            accessToken: params['access_token']
          }
        }).finally(() => {
      });
      return false;
    }
    this.router.navigate(['/message'],
      {
        queryParams: {
          msgType: 'error',
          msgText: params['error_description']
        }
      }).finally(() => {
    });
    return false;
  }

  private static fromFragmentToParamMap(fragment: string): Map<string, string> {
    return fragment.split('&').reduce((map: Map<string, string>, part) => {
      const pieces = part.split('=');
      if (pieces[1].indexOf('+') > -1)  pieces[1] = pieces[1].split('+').join(' ');
      map[pieces[0]] = pieces[1];
      return map;
    }, new Map<string, string>());
  }
}
