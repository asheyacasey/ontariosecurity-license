import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {CartService} from "../../../services/cart.service";

@Injectable({
  providedIn: 'root'
})
export class CourseSelectedGuard implements CanActivate {
  constructor(private cartService: CartService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !this.cartService.empty;
  }

}
