import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let actualRequest = request;

    const token = this.authService.getToken();
    if (token !== null) {
      actualRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      })
    }
    return next.handle(actualRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.signOut();
          if (!error.url?.includes('/user/token')) {
            if (token !== null) {
              // session expired
              this.router.navigate(['/login']);
            } else {
              // wasn't authorized to make this call
              this.router.navigate(['/'])
            }
          }
        }
        return throwError(() => error);
      })
    );
  }
}
