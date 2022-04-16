import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {WydApiService} from "./wyd-api.service";

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private router: Router,
              private apiService: WydApiService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     if (!this.apiService.currentSession) return false;
//     if (this.apiService.isCurrentRoleIsAdmin()) return true;
//     if (this.apiService.sessionUser.roleId !== route.data.expectedRole) {
//       this.router.navigate(['/message'],
//         {
//           queryParams: {
//             pageUrl: state.url,
//             msgType: 'error',
//             msgText: 'Your are not authorized to view this page...'
//           }
//         }).finally(() => {
//       });
//       return false;
//     }
    return true;
  }
}
