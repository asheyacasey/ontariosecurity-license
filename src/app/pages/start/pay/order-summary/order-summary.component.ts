import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subject, takeUntil} from "rxjs";
import {CourseBasic} from "../../../../models/course";
import {CartService} from "../../../../services/cart.service";
import {Router} from "@angular/router";
import {DiscountCodeService} from "../../../../services/discount-code.service";
import {DiscountCode} from "../../../../models/discount-code";

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss', '../../../../shared/shared.scss', '../../../../shared/course-card.scss']
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  isLoading$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  course: CourseBasic;
  discountCode: DiscountCode | null = null;

  constructor(
    private cartService: CartService,
    private router: Router,
    private discountCodeService: DiscountCodeService
  ) {
    this.course = this.cartService.course as CourseBasic;
  }

  ngOnInit(): void {
    this.discountCodeService.discountCode$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(discountCode => {
      this.discountCode = discountCode;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onRemoveCourse(course: CourseBasic): void {
    this.cartService.clear();
    this.router.navigate(['/start', 'course'])
  }

  hasDiscount(): boolean {
    return this.discountCode !== null;
  }

  fullPrice(): number {
    return this.course.price
  }

  discountedPrice(): number {
    if (this.discountCode === null) {
      return this.fullPrice();
    }

    return this.course.price * (1.0 - (this.discountCode?.discountPercent / 100))
  }

}
