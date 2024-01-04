import {Injectable} from '@angular/core';
import {CourseBasic} from "../models/course";
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {PaymentSession} from "../models/payment";
import {PaymentSessionService} from "./payment-session.service";
import {UserLocalStorageService} from "./user-local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  key: string = 'cart-v1';

  private apiUrl: string = environment.apiUrl;

  course: CourseBasic | null = null;

  constructor(
    private userLocalStorageService: UserLocalStorageService,
    private paymentSessionService: PaymentSessionService,
    private http: HttpClient
  ) {
    this._loadState();
  }

  private _loadState(): void {
    const course = this.userLocalStorageService.getItem(this.key);
    if (course) {
      // todo: type safety
      this.course = JSON.parse(course);
    }
  }

  private _saveState(): void {
    if (this.course !== null) {
      this.userLocalStorageService.setItem(this.key, JSON.stringify(this.course));
    } else {
      this.userLocalStorageService.removeItem(this.key);
    }
  }

  addCourse(course: CourseBasic): void {
    this.course = course;
    this._saveState();
  }

  clear(): void {
    this.course = null
    this._saveState();
  }

  get empty(): boolean {
    return this.course === null;
  }

  initializePayment(billingDetails: any): Observable<PaymentSession> {
    return this.http.post<PaymentSession>(`${this.apiUrl}/course/${this.course?.id}/purchase`, billingDetails).pipe(
      tap((session) => {
        this.paymentSessionService.setSession(session);
      })
    )
  }

}
