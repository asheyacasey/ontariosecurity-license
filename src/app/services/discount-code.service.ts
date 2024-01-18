import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, Subject, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {DiscountCode} from "../models/discount-code";



@Injectable({
  providedIn: 'root'
})
export class DiscountCodeService {
  private apiUrl: string = environment.apiUrl;
  private key: string = 'discount-code-v1';

  private _discountCode: DiscountCode | null = null;

  private _discountCode$$: Subject<DiscountCode | null> = new BehaviorSubject<DiscountCode | null>(null);
  readonly discountCode$ = this._discountCode$$.asObservable();

  constructor(private http: HttpClient) {

  }

  private _loadState(): void {
    const discountCode = sessionStorage.getItem(this.key);
    if (discountCode) {
      this._discountCode = JSON.parse(discountCode);
    } else {
      this._discountCode = null;
    }
  }

  private _saveState(): void {
    if (this._discountCode !== null) {
      sessionStorage.setItem(this.key, JSON.stringify(this._discountCode));
    } else {
      sessionStorage.removeItem(this.key);
    }
  }

  get discountCode(): DiscountCode | null {
    this._loadState();
    return this._discountCode;
  }

  clear(): void {
    this._discountCode = null;
    this._saveState();
  }

  checkCode(code: string): Observable<DiscountCode> {
    return this.http.get<DiscountCode>(`${this.apiUrl}/payment/discount/check/${code}`).pipe(
      catchError((err: HttpErrorResponse) => {
        const error = new Error('Error occurred');
        if (err.status === 404) {
          error.message = err.error.detail;
        }
        return throwError(() => error);
      })
    );
  }

  setDiscountCode(discountCode: DiscountCode | null) {
    this._discountCode = discountCode;
    this._discountCode$$.next(this._discountCode);
    this._saveState();
  }
}
