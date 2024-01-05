import {Injectable} from '@angular/core';
import {UserLocalStorageService} from "./user-local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class BillingDetailsService {
  private key: string = 'billing-details-v1';
  private _billingDetails = {};

  constructor(private userLocalStorageService: UserLocalStorageService) {
  }

  get billingDetails() {
    this._loadState();
    return this._billingDetails;
  }

  private _saveState(): void {
    this.userLocalStorageService.setItem(this.key, JSON.stringify(this._billingDetails));
  }

  private _loadState(): void {
    const item = this.userLocalStorageService.getItem(this.key);
    if (item) {
      this._billingDetails = JSON.parse(item);
    } else {
      this._billingDetails = {};
    }
  }

  clear(): void {
    this._billingDetails = {};
    this._saveState();
  }

  get empty(): boolean {
    return Object.keys(this.billingDetails).length === 0;
  }

  update(billingDetails: any): void {
    this._billingDetails = billingDetails;
    this._saveState();
  }
}
