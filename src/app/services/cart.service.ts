import {Injectable} from '@angular/core';
import {CourseBasic} from "../models/course";
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {PaymentSession} from "../models/payment";
import {PaymentSessionService} from "./payment-session.service";
import {UserLocalStorageService} from "./user-local-storage.service";
import {DiscountCodeService} from "./discount-code.service";
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export interface CustomWindow extends Window {
  linkMink: any;
}


declare var linkMink: any;

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private window: CustomWindow;

  private apiUrl: string = environment.apiUrl;
  private key: string = 'cart-v1';

  private _course: CourseBasic | null = null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private userLocalStorageService: UserLocalStorageService,
    private paymentSessionService: PaymentSessionService,
    private discountCodeService: DiscountCodeService,
    private http: HttpClient
  ) {
    this.window = <any>this.document.defaultView;
  }

  get course(): CourseBasic | null {
    this._loadState();
    return this._course;
  }

  private _loadState(): void {
    const course = this.userLocalStorageService.getItem(this.key);
    if (course) {
      // todo: type safety
      this._course = JSON.parse(course);
    } else {
      this._course = null;
    }
  }

  private _saveState(): void {
    if (this._course !== null) {
      this.userLocalStorageService.setItem(this.key, JSON.stringify(this._course));
    } else {
      this.userLocalStorageService.removeItem(this.key);
    }
  }

  addCourse(course: CourseBasic): void {
    this._course = course;
    this._saveState();
  }

  clear(): void {
    this._course = null
    this._saveState();
  }

  get empty(): boolean {
    return this.course === null;
  }

  initializePayment(billingDetails: any): Observable<PaymentSession> {
    let url = `${this.apiUrl}/course/${this._course?.id}/purchase`;
    if (this.discountCodeService.discountCode) {
      url += `?discount_code=${this.discountCodeService.discountCode.name}`;
    }

    const referralData = this.window.linkMink.getReferralData();
    if (referralData) {
      billingDetails.referral = referralData;
    }
    return this.http.post<PaymentSession>(url, billingDetails).pipe(
      tap((session) => {
        this.paymentSessionService.setSession(session);
      })
    )
  }

}
