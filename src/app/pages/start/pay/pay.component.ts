import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "../../../services/cart.service";
import {CourseBasic} from "../../../models/course";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, debounceTime, finalize, Subject, Subscription, takeUntil} from "rxjs";
import {BillingDetailsService} from "../../../services/billing-details.service";
import {PaymentSessionService} from "../../../services/payment-session.service";
import {Title} from "@angular/platform-browser";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss', '../../../shared/shared.scss', '../../../shared/course-card.scss']
})
export class PayComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  isLoading$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  course: CourseBasic;

  billingDetailsForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required, Validators.minLength(2), Validators.maxLength(64)]
    ),
    lastName: new FormControl('', [
      Validators.required, Validators.minLength(2), Validators.maxLength(64)
    ]),
    email: new FormControl('', [
      Validators.required, Validators.email, Validators.maxLength(64)
    ]),
    phone: new FormControl('', [
      Validators.required, Validators.minLength(6), Validators.maxLength(64)
    ]),
    addressLine1: new FormControl('', [Validators.required, Validators.maxLength(128)]),
    addressLine2: new FormControl('', [Validators.maxLength(128)]),
    country: new FormControl('Canada', [Validators.required, Validators.maxLength(128)]),
    province: new FormControl('Ontario', [Validators.required, Validators.maxLength(128)]),
  })

  constructor(
    private titleService: Title,
    private router: Router,
    private cartService: CartService,
    private billingDetailsService: BillingDetailsService,
    private paymentSessionService: PaymentSessionService,
    private authService: AuthenticationService
  ) {
    this.course = this.cartService.course as CourseBasic;
    if (!this.billingDetailsService.empty) {
      // if there are some details already provided, use them
      this.billingDetailsForm.patchValue(this.billingDetailsService.billingDetails);
    } else {
      // otherwise, fill just the email
      this.billingDetailsForm.patchValue({
        email: this.authService.user?.email
      });
    }
  }

  ngOnInit(): void {
    this.titleService.setTitle('Complete payment | Ontario Security License');

    this.paymentSessionService.clear();

    this.billingDetailsForm.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(500)
    ).subscribe((values) => {
      this.billingDetailsService.update(values);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onRemoveCourse(course: CourseBasic): void {
    this.cartService.clear();
    this.router.navigate(['/start', 'course'])
  }

  onSubmit() {
    this.isLoading$.next(true);

    this.cartService.initializePayment(
      this.billingDetailsForm.value
    ).pipe(
      finalize(() => this.isLoading$.next(false))
    ).subscribe((session) => {
      (window as any).location.href = session.url;
    })
  }
}
