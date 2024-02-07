import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {UserLoginRequest, UserRegisterRequest} from "../../../models/user";
import {BehaviorSubject, filter, finalize, Subject, switchMap, tap} from "rxjs";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {GoogleTagManagerService} from "angular-google-tag-manager";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../../shared/shared.scss']
})
export class RegisterComponent implements OnInit {

  isLoading$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  showLoginSuggestion: boolean = false;

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    phone: new FormControl('', [
      Validators.required, Validators.minLength(6), Validators.maxLength(32)
    ])
  })

  constructor(
    private titleService: Title,
    private authService: AuthenticationService,
    private router: Router,
    private gtmService: GoogleTagManagerService
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Register | Ontario Security License');
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
