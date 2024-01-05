import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {PaymentSession, PaymentStatus} from "../models/payment";
import {HttpClient} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentSessionService {
  private key: string = 'payment-session-v1';
  private apiUrl: string = environment.apiUrl;

  private _session: PaymentSession | null = null;


  constructor(private http: HttpClient) {
  }

  get session(): PaymentSession | null {
    this._loadState();
    return this._session;
  }

  private _loadState(): void {
    const session = localStorage.getItem(this.key);
    if (session) {
      this._session = JSON.parse(session);
    } else {
      this._session = null;
    }
  }

  private _saveState(): void {
    if (this._session !== null) {
      localStorage.setItem(this.key, JSON.stringify(this._session));
    } else {
      localStorage.removeItem(this.key);
    }
  }

  clear(): void {
    this._session = null;
    this._saveState();
  }

  get empty(): boolean {
    return this.session === null;
  }

  setSession(session: PaymentSession) {
    this._session = session;
    this._saveState();
  }

  getSessionStatus(): Observable<PaymentStatus | null> {
    if (this.empty) {
      return of(null);
    }

    return this.http.get<PaymentStatus>(`${this.apiUrl}/payment/check/${this._session?.txn}`);
  }
}
