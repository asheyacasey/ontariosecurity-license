import { Injectable } from '@angular/core';
import {CourseNavigationState} from "../models/course";
import {HttpClient} from "@angular/common/http";
import {UserLocalStorageService} from "./user-local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class CourseNavigationStateService {
  private key: string = 'course-navigation-state-v1';
  private _state: {[id: number]: CourseNavigationState} = {};

  constructor(private http: HttpClient, private userLocalStorageService: UserLocalStorageService) {
  }

  get state(): {[id: number]: CourseNavigationState} {
    this._loadState();
    return this._state;
  }

  private _loadState(): void {
    const course = this.userLocalStorageService.getItem(this.key);
    if (course) {
      // todo: type safety
      this._state = JSON.parse(course);
    }
  }

  private _saveState(): void {
    if (this._state !== null) {
      this.userLocalStorageService.setItem(this.key, JSON.stringify(this._state));
    } else {
      this.userLocalStorageService.removeItem(this.key);
    }
  }

  addState(state: CourseNavigationState): void {
    this._state[state.courseId] = state;
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
    this._state = {}
    this._saveState();
  }

  get empty(): boolean {
    return Object.keys(this.state).length === 0;
  }
}
