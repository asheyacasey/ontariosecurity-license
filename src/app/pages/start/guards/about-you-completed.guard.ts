import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of, switchMap} from 'rxjs';
import {AuthenticationService} from "../../../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AboutYouCompletedGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authenticationService.isLoggedIn()) {
      return this.router.parseUrl('/start/register');
    }
    return this.authenticationService.getUserDetails().pipe(
      switchMap((details) => {
        if (details.aboutYouCompleted) {
          return of(true);
        } else {
          return of(this.router.parseUrl('/start/tell-us-about-you'))
        }
      }),

    )
  }

}
