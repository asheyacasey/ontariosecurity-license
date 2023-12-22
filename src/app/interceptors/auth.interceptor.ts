import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private inj: Injector) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let actualRequest = request;

    // todo: remap to use authservice
    const token = localStorage.getItem('token');
    if (token !== null) {
      actualRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      })
    }
    return next.handle(actualRequest).pipe(
      // catchError((error: HttpErrorResponse) => {
      //   if (error.status === 401) {
      //     authService.signOut();
      //   }
      //   return throwError(() => error);
      // })
    );
  }
}
