import {Injectable} from '@angular/core';
import {Language} from "../models/language";
import {BehaviorSubject, Subject} from "rxjs";
import {UserLocalStorageService} from "./user-local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private key: string = 'language-v1';

  private _language$$: Subject<Language | null> = new BehaviorSubject<Language | null>(null);
  readonly language$ = this._language$$.asObservable();

  private defaultLanguage: Language = {
    name: 'English',
    code: 'en',
  }

  private _state: Language = this.defaultLanguage;


  constructor(
    private userLocalStorageService: UserLocalStorageService
  ) {
  }

  get state(): Language {
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

  setLanguage(language: Language) {
    this._state = language;
    this._saveState();

    this._language$$.next(language);
  }

  getLanguage(): Language {
    return this.state;
  }
}
