import { Injectable } from '@angular/core';
import {CourseOverview} from "../models/course";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  key: string = 'cart-v1';

  course: CourseOverview | null = null;

  constructor() {
    this._loadState();
  }

  private _saveState(): void {
    if (this.course !== null) {
      localStorage.setItem(this.key, JSON.stringify(this.course));
    } else {
      localStorage.removeItem(this.key);
    }

  }

  private _loadState(): void {
    const item = localStorage.getItem('cart-v1');
    if (item) {
      // todo: type safety
      this.course = JSON.parse(item);
    }
  }

  addCourse(course: CourseOverview): void {
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
}
