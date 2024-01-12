import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, catchError, finalize, Subject, takeUntil, throwError} from "rxjs";
import {DiscountCodeService} from "../../../../services/discount-code.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss', '../../../../shared/shared.scss', '../../../../shared/course-card.scss']
})
export class DiscountComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  isLoading$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  valid: boolean | null = null;
  message: string | null = null;

  discountCodeForm = new FormGroup({
    code: new FormControl('', [
      Validators.required, Validators.minLength(4), Validators.maxLength(32)]
    )
  })

  constructor(private discountCodeService: DiscountCodeService) {
  }


  ngOnInit(): void {
    this.discountCodeForm.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => {
      if (this.valid === false) {
        this.valid = null;
      }
    });

    if (this.discountCodeService.discountCode) {
      this.checkCode(this.discountCodeService.discountCode.name, false);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  checkCode(code: string, showErrors: boolean) {
    this.isLoading$.next(true);
    this.discountCodeService.checkCode(code).pipe(
      finalize(() => {
        this.isLoading$.next(false);
      })
    ).subscribe({
      next: (discountCode) => {
        this.valid = true;
        this.message = `Discount -${discountCode.discountPercent}%`;
        this.discountCodeForm.patchValue({
          code: discountCode.name
        });

        this.discountCodeService.setDiscountCode(discountCode);
      },
      error: (err) => {
        if (showErrors) {
          this.valid = false;
          this.message = err.message;
        }

        this.discountCodeService.setDiscountCode(null);
      }
    })
  }

  onSubmit(): void {
    const value = this.discountCodeForm.controls['code'].value;
    if (value) {
      this.checkCode(value, true);
    }
  }

  removeDiscountCode(): void {
    this.valid = null;
    this.message = null;
    this.discountCodeService.setDiscountCode(null);
  }
}
