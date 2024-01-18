import { Component } from '@angular/core';
import {AbstractListingComponent} from "../abstract-listing-component";
import {CourseTimerService} from "../../../services/course-timer.service";
import {AdminCourseService} from "../../../services/admin/admin-course.service";
import {ActivatedRoute} from "@angular/router";
import {ViewportScroller} from "@angular/common";
import {PagedAdminPayments} from "../../../models/admin/payment";
import {AdminPaymentService} from "../../../services/admin/admin-payment.service";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent extends AbstractListingComponent<PagedAdminPayments> {

  showDetails: number[] = [];

  constructor(
    searchService: AdminPaymentService,
    activatedRoute: ActivatedRoute,
    viewport: ViewportScroller
  ) {
    super(activatedRoute, viewport);
    this.searchService = searchService;
  }

  detailsShown(paymentId: number): boolean {
    return this.showDetails.indexOf(paymentId) > -1;
  }

  detailsHidden(paymentId: number): boolean {
    return !this.detailsShown(paymentId);
  }

  toggleShowDetails(paymentId: number): void {
    const index = this.showDetails.indexOf(paymentId);
    if (index > -1) {
      this.showDetails.splice(index, 1);
    } else {
      this.showDetails.push(paymentId);
    }
  }
}
