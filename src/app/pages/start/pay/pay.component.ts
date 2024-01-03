import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "../../../services/cart.service";
import {CourseBasic} from "../../../models/course";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, debounceTime, finalize, Subject, Subscription, takeUntil} from "rxjs";
import {BillingDetailsService} from "../../../services/billing-details.service";
import {PaymentSessionService} from "../../../services/payment-session.service";
import {Title} from "@angular/platform-browser";

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
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    addressLine1: new FormControl('', [Validators.required]),
    addressLine2: new FormControl('',),
    country: new FormControl('Canada', [Validators.required]),
    province: new FormControl('Ontario', [Validators.required]),
  })

  constructor(
    private titleService: Title,
    private router: Router,
    private cartService: CartService,
    private billingDetailsService: BillingDetailsService,
    private paymentSessionService: PaymentSessionService
  ) {
    this.course = this.cartService.course as CourseBasic;
    this.billingDetailsForm.patchValue(this.billingDetailsService.billingDetails);
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
