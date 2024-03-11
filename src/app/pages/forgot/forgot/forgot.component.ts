import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, finalize, Subject, takeUntil} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationProvider, UserPasswordResetSetRequest} from "../../../models/user";
import {PasswordResetService} from "../../../services/password-reset.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss', '../../../shared/shared.scss']
})
export class ForgotComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  isLoading$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  requested: boolean = false;
  error: boolean = false;

  resetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  constructor(private passwordResetService: PasswordResetService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    this.isLoading$.next(true);
    this.passwordResetService.createResetCode(this.resetPasswordForm.value as UserPasswordResetSetRequest).pipe(
      finalize(() => this.isLoading$.next(false))
    ).subscribe({
      next: () => {
        this.requested = true;
      },
      error: (response: HttpErrorResponse) => {
        if (response.status === 409) {
          this.error = true;
        }
      }
    })
  }
}
