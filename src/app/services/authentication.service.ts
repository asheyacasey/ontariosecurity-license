import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {
  BehaviorSubject,
  catchError,
  firstValueFrom,
  map,
  Observable,
  of,
  ReplaySubject,
  switchMap,
  tap,
  throwError
} from "rxjs";
import {environment} from "../../environments/environment";
import {AccessToken, UserDetails, UserLoginRequest, UserRegisterError, UserRegisterRequest} from "../models/user";
import {Router} from "@angular/router";

/***
 * Factory to be used in APP_INITIALIZER
 * @param authService
 * @constructor
 */
export function AuthenticationServiceFactory(authService: AuthenticationService) {
  return () => firstValueFrom(authService.load());
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  key: string = 'token';

  user: UserDetails | null = null;
  user$ = new BehaviorSubject<UserDetails | null>(null);

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {
  }

  /***
   * Loads the initial state of the service given a persisted token
   */
  load(): Observable<boolean> {
    const token = this.getToken();
    if (token) {
      // if token is present, try to load user details
      return this.getUserDetails().pipe(
        catchError((error: HttpErrorResponse) => {
          // if error is caught, we assume it's 401 and the token has expired:
          // deletion of the old token will be handled through the auth interceptor.
          // notify the load is complete
          return of(true);
        }),
        map(() => true),
      );
    } else {
      return of(true);
    }

  }

  signUp(data: UserRegisterRequest): Observable<UserRegisterError | null> {
    return this.http.post(`${this.apiUrl}/user/register`, data).pipe(
      map(() => {
        return null;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 409) {
          return of({
            message: 'This user has already been registered',
            suggestLogin: true
          })
        }
        return of({message: 'Unknown error occurred', suggestLogin: false})
      })
    );
  }

  signIn(data: UserLoginRequest): Observable<UserDetails> {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = `username=${data.username}&password=${data.password}`;

    return this.http.post<AccessToken>(`${this.apiUrl}/user/token`, body, {headers: headers}).pipe(
      tap((token: AccessToken) => {
        localStorage.setItem(this.key, token.access_token);
      }),
      switchMap((token: AccessToken) => {
        return this.getUserDetails();
      })
    )
  }

  signOut(): void {
    localStorage.removeItem(this.key);
    this.user$.next(null);

    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.key);
  }

  getUserDetails(): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${this.apiUrl}/user`).pipe(
      tap((details) => {
        this.user = details;
        this.user$.next(this.user);
      })
    )
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
