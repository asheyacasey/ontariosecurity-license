import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {PaymentSessionService} from "../../../services/payment-session.service";

@Injectable({
  providedIn: 'root'
})
export class CoursePaymentStartedGuard implements CanActivate {
  constructor(private paymentSessionService: PaymentSessionService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.paymentSessionService.empty) {
      return this.router.parseUrl('/profile')
    }
    return true;
  }

}
