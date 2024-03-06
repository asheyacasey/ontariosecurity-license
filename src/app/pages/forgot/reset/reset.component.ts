import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, finalize, Subject, takeUntil, timer} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PasswordResetService} from "../../../services/password-reset.service";
import {UserPasswordResetSetRequest} from "../../../models/user";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss', '../../../shared/shared.scss']
})
export class ResetComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  isLoading$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  code: string | null = null;
  codeValid: boolean | null = null;
  resetSuccessful: boolean | null = null;

  resetPasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private passwordResetService: PasswordResetService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      this.loadResetCode(params['resetCode']);
    });
  }

  loadResetCode(code: string): void {
    this.passwordResetService.checkResetCode(code).subscribe((result) => {
      this.codeValid = result;
      if (this.codeValid) {
        this.code = code;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    this.isLoading$.next(true);
    const data = this.resetPasswordForm.value as UserPasswordResetSetRequest;
    data.code = this.code as string;

    this.passwordResetService.resetPassword(data).pipe(
      finalize(() => this.isLoading$.next(false))
    ).subscribe((result) => {
      if (result) {
        this.resetSuccessful = true;
        timer(3000).subscribe(() => {
          this.router.navigate(['/login']);
        });
      } else {
        this.codeValid = false;
      }
    });
  }
}
