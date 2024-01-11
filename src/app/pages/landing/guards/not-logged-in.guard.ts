import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {filter, map, Observable} from 'rxjs';
import {AuthenticationService} from "../../../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class NotLoggedInGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if the user is logged in
    if (this.authenticationService.isLoggedIn()) {
      return this.authenticationService.user$.pipe(
        filter(user => user !== null),
        map((user) => {
          if (user === null) {
            // won't happen due to filter
            return false;
          }

          // and already has some course access
          if (user.hasCourseAccess) {
            // redirect to profile (course progress page)
            return this.router.parseUrl('/profile')
          } else {
            // if the user does not have a course access, let him choose the course
            return this.router.parseUrl('/start/course');
          }
        })
      );
    } else {
      // otherwise show landing page
      return true;
    }
  }

}
