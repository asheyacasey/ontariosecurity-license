import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {filter, map, Observable} from 'rxjs';
import {AuthenticationService} from "../../../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class NoCourseBoughtGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // can only be activated if user has not bought any course yet
    return this.authService.user$.pipe(
      filter(user => user !== null),
      map((user) => {
        if (user === null) {
          // won't happen due to filter
          return false;
        }

        if (user.hasCourseAccess) {
          return this.router.parseUrl('/profile')
        }
        return true;
      })
    );
  }

}
