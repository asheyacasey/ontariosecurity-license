import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "../../../services/cart.service";
import {CourseOverview} from "../../../models/course";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {debounceTime, Subscription} from "rxjs";

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss', '../../../shared/shared.scss', '../../../shared/course-card.scss']
})
export class PayComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  course: CourseOverview;

  billingDetailsForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    addressFirstLine: new FormControl('', [Validators.required]),
    addressSecondLine: new FormControl('',),
    country: new FormControl('Canada', [Validators.required]),
    province: new FormControl('Ontario', [Validators.required]),
  })

  constructor(
    private router: Router,
    private cartService: CartService
  ) {
    this.course = this.cartService.course as CourseOverview;
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.billingDetailsForm.valueChanges.pipe(
        debounceTime(500)
      ).subscribe((values) => {
        console.log(values);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.map(s => s.unsubscribe());
  }

  onRemoveCourse(course: CourseOverview): void {
    this.cartService.clear();
    this.router.navigate(['/start', 'course'])
  }

  onSubmit() {

  }
}
