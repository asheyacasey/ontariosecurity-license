import { Injectable } from '@angular/core';
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class UserLocalStorageService {

  constructor(
    private authService: AuthenticationService
  ) { }

  getItem(key: string): any {
    if (!this.authService.user) {
      return null;
    }
    console.log(this.authService.user.id);
    return localStorage.getItem(`${key}-${this.authService.user.id}`);
  }

  setItem(key: string, value: string): void {
    if(this.authService.user) {
     localStorage.setItem(`${key}-${this.authService.user.id}`, value);
    }
  }

  removeItem(key: string): void {
    if (this.authService.user) {
      localStorage.removeItem(`${key}-${this.authService.user.id}`);
    }
  }
}
