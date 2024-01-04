import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {CourseBasic, CourseNavigationState} from "../models/course";
import {HttpClient} from "@angular/common/http";
import {PaymentSessionService} from "./payment-session.service";
import {UserLocalStorageService} from "./user-local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class CourseNavigationStateService {
  key: string = 'course-navigation-state-v1';

  state: {[id: number]: CourseNavigationState} = {};

  constructor(private http: HttpClient, private userLocalStorageService: UserLocalStorageService,) {
    this._loadState();
  }

  private _loadState(): void {
    const course = this.userLocalStorageService.getItem(this.key);
    if (course) {
      // todo: type safety
      this.state = JSON.parse(course);
    }
  }

  private _saveState(): void {
    if (this.state !== null) {
      this.userLocalStorageService.setItem(this.key, JSON.stringify(this.state));
    } else {
      this.userLocalStorageService.removeItem(this.key);
    }
  }

  addState(state: CourseNavigationState): void {
    this.state[state.courseId] = state;
    this._saveState();
  }

  getState(courseId: number): CourseNavigationState | null {
    if (courseId in this.state) {
      return this.state[courseId]
    }
    return null;
  }

  toUrl(state: CourseNavigationState): any[] {
    return ['/learn', state.courseId, state.itemType, state.itemId];
  }

  clear(): void {
    this.state = {}
    this._saveState();
  }

  get empty(): boolean {
    return Object.keys(this.state).length === 0;
  }
}
