import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, filter, finalize, Subject, switchMap, tap} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {Router} from "@angular/router";
import {AuthenticationProvider, UserRegisterRequest} from "../../../models/user";
import {GoogleTagManagerService} from "angular-google-tag-manager";

@Component({
  selector: 'app-landing-register',
  templateUrl: './landing-register.component.html',
  styleUrls: ['./landing-register.component.scss', './../landing-v2/landing-v2.component.scss']
})
export class LandingRegisterComponent implements OnInit {

  isLoading$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  showLoginSuggestion: boolean = false;

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    provider: new FormControl(AuthenticationProvider.Local)
  })

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private gtmService: GoogleTagManagerService,
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.isLoading$.next(true);

    const data = this.registerForm.value as UserRegisterRequest;

    this.authService.signUp(data).pipe(
      tap((err) => {
        if (err !== null) {
          this.showLoginSuggestion = err.suggestLogin;
        }
      }),
      filter((err) => err === null),
      switchMap((err) => {
        return this.authService.signIn({
          provider: AuthenticationProvider.Local,
          username: this.registerForm.controls.email.value as string,
          password: this.registerForm.controls.password.value as string
        });
      }),
      finalize(() => this.isLoading$.next(false))
    ).subscribe((user) => {
      this.gtmService.pushTag({
        event: 'email_submitted',
      }).finally(() => {
        this.router.navigate(['/start/course']);
      });
    })
  }
}
