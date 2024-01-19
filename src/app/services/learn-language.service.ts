import {Injectable} from '@angular/core';
import {Language} from "../models/language";
import {BehaviorSubject, Subject} from "rxjs";
import {UserLocalStorageService} from "./user-local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class LearnLanguageService {
  private key: string = 'learn-language-v1';

  private _language$$: Subject<Language | null> = new BehaviorSubject<Language | null>(null);
  readonly language$ = this._language$$.asObservable();

  private _state: { [id: number]: Language } = {};

  private defaultLanguage: Language = {
    name: 'English',
    code: 'en',
  }


  constructor(
    private userLocalStorageService: UserLocalStorageService
  ) {
  }

  get state(): { [id: number]: Language } {
    this._loadState();
    return this._state;
  }

  private _loadState(): void {
    const language = this.userLocalStorageService.getItem(this.key);
    if (language) {
      this._state = JSON.parse(language);
    }
  }

  private _saveState(): void {
    this.userLocalStorageService.setItem(this.key, JSON.stringify(this._state));
  }

  setLanguage(courseId: number, language: Language) {
    this._state[courseId] = language;
    this._saveState();

    this._language$$.next(language);
  }

  getLanguage(courseId: number): Language {
    if (courseId in this.state) {
      return this.state[courseId];
    }
    return this.defaultLanguage;
  }
}
