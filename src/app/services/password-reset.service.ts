import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {UserPasswordResetSetRequest, UserPasswordResetResponse} from "../models/user";
import {catchError, Observable, of, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  createResetCode(data: UserPasswordResetSetRequest): Observable<UserPasswordResetResponse> {
    return this.http.post<UserPasswordResetResponse>(`${this.apiUrl}/user/password/reset`, data);
  }

  checkResetCode(code: string): Observable<boolean> {
    return this.http.get(`${this.apiUrl}/user/password/reset/${code}`).pipe(
      switchMap(() => of(true)),
      catchError((err: HttpErrorResponse) => {
        return of(false);
      })
    );
  }

  resetPassword(data: UserPasswordResetSetRequest): Observable<boolean> {
    return this.http.put(`${this.apiUrl}/user/password/reset/set`, data).pipe(
      switchMap(() => of(true)),
      catchError((err: HttpErrorResponse) => {
        return of(false);
      })
    );
  }
}
