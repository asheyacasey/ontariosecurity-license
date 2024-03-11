import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of, switchMap} from 'rxjs';
import {AuthenticationService} from "../../../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class NoAboutYouCompletedGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authenticationService.isLoggedIn()) {
      return this.router.parseUrl('/start/login');
    }
    return this.authenticationService.getUserDetails().pipe(
      switchMap((details) => {
        if (details.aboutYouCompleted) {
          return of(this.router.parseUrl('/start/course'));
        } else {
          return of(true)
        }
      }),

    )
  }

}
