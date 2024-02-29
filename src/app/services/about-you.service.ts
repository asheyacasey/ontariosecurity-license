import { Injectable } from '@angular/core';
import {LocalStorageService} from "./local-storage.service";
import {AboutYouForm, UserDetails} from "../models/user";
import {catchError, Observable, throwError} from "rxjs";
import {DiscountCode} from "../models/discount-code";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AboutYouService {
  private apiUrl: string = environment.apiUrl;

  private key: string = 'about-you-v1';

  private _data: AboutYouForm | null = null;

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) {
  }

  get data(): AboutYouForm | null {
    this._loadState();
    return this._data;
  }

  private _loadState(): void {
    const course = this.localStorageService.getItem(this.key);
    if (course) {
      // todo: type safety
      this._data = JSON.parse(course);
    } else {
      this._data = null;
    }
  }

  private _saveState(): void {
    if (this._data !== null) {
      this.localStorageService.setItem(this.key, JSON.stringify(this._data));
    } else {
      this.localStorageService.removeItem(this.key);
    }
  }

  addForm(data: AboutYouForm): void {
    this._data = data;
    this._saveState();
  }

  clear(): void {
    this._data = null
    this._saveState();
  }

  get empty(): boolean {
    return this.data === null;
  }

  saveForm(data: AboutYouForm): Observable<UserDetails> {
    this.addForm(data);
    return this.http.post<UserDetails>(`${this.apiUrl}/user/about-you`, data);
  }
}
