import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "../../../services/cart.service";
import {PaymentSessionService} from "../../../services/payment-session.service";
import {BillingDetailsService} from "../../../services/billing-details.service";
import {interval, merge, Subject, switchMap, takeUntil} from "rxjs";
import {PaymentStatus} from "../../../models/payment";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";
import {Title} from "@angular/platform-browser";
import {DiscountCodeService} from "../../../services/discount-code.service";

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss', '../../../shared/shared.scss', '../../../shared/course-card.scss']
})
export class CompletedComponent implements OnInit, OnDestroy {
  statusReceived$: Subject<boolean> = new Subject<boolean>();
  destroy$: Subject<boolean> = new Subject<boolean>();

  transactionCompleted = false;

  transactionNumber?: number;
  amountPaid?: number;

  constructor(
    private titleService: Title,
    private cartService: CartService,
    private billingDetailsService: BillingDetailsService,
    private paymentSessionService: PaymentSessionService,
    private authenticationService: AuthenticationService,
    private discountCodeService: DiscountCodeService,
    private router: Router
  ) {
    this.transactionNumber = this.paymentSessionService.session?.id;
    this.amountPaid = this.cartService.course?.price;
  }

  ngOnInit(): void {
    this.titleService.setTitle('Waiting for payment confirmation.. | Ontario Security License');

    interval(3000).pipe(
      takeUntil(merge(this.statusReceived$, this.destroy$)),
      switchMap(() => this.paymentSessionService.getSessionStatus())
    ).subscribe((payment: PaymentStatus | null) => {
      if (payment === null) {
        // no session in progress
        this.router.navigate(['/start/course']);
        return;
      }

      if (payment.status === 'STARTED') {
        // we're waiting
        return;
      }

      if (payment.status === 'COMPLETED') {
        this.amountPaid = payment.paidAmount;

        // update the `hasCourseAccess` flag
        this.authenticationService.getUserDetails().subscribe();
        this.transactionCompleted = true;

        this.cartService.clear();
        this.paymentSessionService.clear();
        this.billingDetailsService.clear();
        this.discountCodeService.clear();

        this.statusReceived$.next(true);
        this.statusReceived$.unsubscribe();

        this.titleService.setTitle('Payment confirmed! | Ontario Security License');

      }

      if (payment.status === 'CANCELLED') {
        // payment has been cancelled

        this.paymentSessionService.clear();
        this.router.navigate(['/start/pay']);
      }

    })
  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
