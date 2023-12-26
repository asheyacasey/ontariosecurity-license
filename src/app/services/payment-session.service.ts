import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {CourseBasic} from "../models/course";
import {PaymentSession, PaymentStatus} from "../models/payment";
import {HttpClient} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";
import {UserDetails} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class PaymentSessionService {
  key: string = 'payment-session-v1';

  session: PaymentSession | null = null;

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
    this._loadState();
  }

  private _loadState(): void {
    const session = localStorage.getItem(this.key);
    if (session) {
      this.session = JSON.parse(session);
    }
  }

  private _saveState(): void {
    if (this.session !== null) {
      localStorage.setItem(this.key, JSON.stringify(this.session));
    } else {
      localStorage.removeItem(this.key);
    }
  }

  clear(): void {
    this.session = null;
    this._saveState();
  }

  get empty(): boolean {
    return this.session === null;
  }

  setSession(session: PaymentSession) {
    this.session = session;
    this._saveState();
  }

  getSessionStatus(): Observable<PaymentStatus | null> {
    if (this.empty) {
      return of(null);
    }

    return this.http.get<PaymentStatus>(`${this.apiUrl}/payment/check/${this.session?.txn}`);
  }
}
