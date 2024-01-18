import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "../../../services/cart.service";
import {CourseBasic} from "../../../models/course";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, debounceTime, filter, finalize, Subject, Subscription, takeUntil} from "rxjs";
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
    private billingDetailsService: BillingDetailsService,
    private paymentSessionService: PaymentSessionService,
    private authService: AuthenticationService,
    private cartService: CartService
  ) {

  }

  ngOnInit(): void {
    this.titleService.setTitle('Pay with card | Ontario Security License');

    this.paymentSessionService.clear();

    this.billingDetailsForm.valueChanges.pipe(
      takeUntil(this.destroy$),
      filter((values) => (<any>Object).values(values).some((v: string | null) => v !== null)),
      debounceTime(500)
    ).subscribe((values) => {
        this.billingDetailsService.update(values);
    });

    this.initializeFormData();
    this.authService.user$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((user) => {
      if (!user) {
        this.billingDetailsForm.reset();
      } else {
        this.initializeFormData();
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  initializeFormData(): void {
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
