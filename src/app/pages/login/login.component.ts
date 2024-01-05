import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {UserLoginRequest, UserRegisterRequest} from "../../models/user";
import {BehaviorSubject, filter, finalize, Subject, switchMap, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../shared/shared.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  isLoading$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  showError: boolean = false;


  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.showError = false;
    })
  }

  onSubmit(): void {
    this.isLoading$.next(true);
    this.showError = false;

    const data = this.loginForm.value as UserLoginRequest;
    this.authService.signIn(data).pipe(
      filter((details) => details !== null),
      finalize(() => this.isLoading$.next(false))
    ).subscribe({
      next: () => {
        this.router.navigate(['/start/course'])
      },
      error: () => {
        this.showError = true;
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
