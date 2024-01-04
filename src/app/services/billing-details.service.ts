import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {CourseBasic} from "../models/course";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {PaymentSession} from "../models/payment";
import {UserLocalStorageService} from "./user-local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class BillingDetailsService {

  key: string = 'billing-details-v1';
  private apiUrl: string = environment.apiUrl;

  billingDetails = {};

  constructor(private userLocalStorageService: UserLocalStorageService) {
    this._loadState();
  }

  private _saveState(): void {
    this.userLocalStorageService.setItem(this.key, JSON.stringify(this.billingDetails));
  }

  private _loadState(): void {
    const item = this.userLocalStorageService.getItem(this.key);
    if (item) {
      this.billingDetails = JSON.parse(item);
    }
  }

  clear(): void {
    this.billingDetails = {};
    this._saveState();
  }

  get empty(): boolean {
    return Object.keys(this.billingDetails).length === 0;
  }

  update(billingDetails: any): void {
    this.billingDetails = billingDetails;
    this._saveState();
  }
}
