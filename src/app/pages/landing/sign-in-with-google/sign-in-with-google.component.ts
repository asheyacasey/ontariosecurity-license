import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {catchError, filter, of, Subject, switchMap, takeUntil, tap, throwError} from "rxjs";
import {AuthenticationService} from "../../../services/authentication.service";
import {AuthenticationProvider, UserRegisterError} from "../../../models/user";
import {HttpErrorResponse} from "@angular/common/http";
import {GoogleTagManagerService} from "angular-google-tag-manager";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in-with-google',
  templateUrl: './sign-in-with-google.component.html',
  styleUrls: ['./sign-in-with-google.component.scss']
})
export class SignInWithGoogleComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Input() text: 'signup_with' | 'signin_with' = 'signup_with';

  private user: SocialUser | null = null;

  constructor(
    private authService: AuthenticationService,
    private socialAuthService: SocialAuthService,
    private gtmService: GoogleTagManagerService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.socialAuthService.authState.pipe(
      takeUntil(this.destroy$),
      filter((user) => user !== null),
      tap((user) => {
        this.user = user;
      }),
      switchMap((user) => {
        return this.authService.signUp({
          provider: AuthenticationProvider.Google,
          email: user.email,
          password: user.idToken
        }).pipe(
          tap(() => {
            this.gtmService.pushTag({
              event: 'email_submitted',
            });
          }),
          catchError((err: HttpErrorResponse) => {
            // if there's an 409 error, it means the user is already signed up
            // that's fine in the social auth context, as we can just attempt to log in that user
            if (err.status === 409) {
              return of(null);
            }
            return throwError(() => err);
          }))
      }),
      switchMap(() => {
        return this.authService.signIn({
          provider: AuthenticationProvider.Google,
          username: this.user?.email as string,
          password: this.user?.idToken as string
        });
      })
    ).subscribe({
      next: () => {
        this.router.navigate(['/start/course']);
      },
      error: (error: UserRegisterError) => {
        // todo: show toast notification or something similar
        console.log('Something went wrong');
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
