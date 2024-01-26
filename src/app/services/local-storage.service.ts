import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  getItem(key: string): any {
    return localStorage.getItem(`${key}-anonymous`);
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(`${key}-anonymous`, value);
  }

  removeItem(key: string): void {
    localStorage.removeItem(`${key}-anonymous`);
  }
}
